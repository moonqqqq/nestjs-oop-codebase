import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { FILE_ENUM, FILE_ENUM_TYPE } from '../constants/input-file.constant';
import { ILoggerService } from '../../../share-modules/logger/interface/logger-service.interface';
import { FILE_MIMETYPE } from '../constants/input-file.constant';
import { IUploadService } from '../interfaces/upload-service.interface';

@Injectable()
export class S3Service implements IUploadService {
  private s3: AWS.S3;

  constructor(
    private readonly logger: ILoggerService,
    private readonly configService: ConfigService,
  ) {
    this.s3 = new AWS.S3({
      signatureVersion: 'v4',
      accessKeyId: this.configService.get('s3.accessKeyId'),
      secretAccessKey: this.configService.get('s3.secretAccessKey'),
      region: this.configService.get('s3.region'),
    });
  }

  async uploadImageToStorage(file: Express.Multer.File) {
    const formattedFilename = this.#getFormattedFileName(file.originalname);
    const savedURL = await this.#uploadImage(file, formattedFilename);

    return { savedURL, formattedFilename };
  }

  /**
   * this doesn't set ContentType on s3
   */
  async uploadAttachmentToStorage(file: Express.Multer.File) {
    const formattedFilename = this.#getFormattedFileName(file.originalname);
    const savedURL = await this.#uploadAttachment(file, formattedFilename);

    return { savedURL, formattedFilename };
  }

  async #uploadImage(file: Express.Multer.File, formattedFilename: string) {
    try {
      await this.s3
        .upload({
          Key: this.#getFileKey(FILE_ENUM.IMAGE, formattedFilename),
          Body: file.buffer,
          Bucket: this.configService.get('s3.bucket'),
          ContentType: FILE_MIMETYPE.IMAGE_PNG,
        })
        .promise();
    } catch (err) {
      this.logger.error(err);
      throw err;
    }

    return this.#getSavedURL(FILE_ENUM.IMAGE, formattedFilename);
  }

  /**
   * the result will be downloaded not showing on browser
   */
  async #uploadAttachment(
    file: Express.Multer.File,
    formattedFilename: string,
  ) {
    try {
      await this.s3
        .upload({
          Key: this.#getFileKey(FILE_ENUM.FILE, formattedFilename),
          Body: file.buffer,
          Bucket: this.configService.get('s3.bucket'),
          ContentDisposition: `attachment; filename="${formattedFilename}"`,
        })
        .promise();
    } catch (err) {
      this.logger.error(err);
    }
    return this.#getSavedURL(FILE_ENUM.FILE, formattedFilename);
  }

  /**
   * This is for cleaning up the filename. and make it not duplicatable by adding date
   */
  #getFormattedFileName(filename: string) {
    // Extract the extension without using split and pop:
    const extension = filename.match(/\.[^.]+$/)?.[0];

    if (!extension) {
      // Handle cases where there's no extension:
      return filename.trim().replace(/\s+/g, '_') + Date.now();
    }

    // Remove the extension from the filename before trimming:
    const baseName = filename.slice(0, -extension.length);
    return `${baseName.trim().replace(/\s+/g, '_')}${Date.now()}${extension}`;
  }

  /**
   * This is for setting the directory.
   * You can make it structured granularly by adding more directory like adding userId directory.
   */
  #getFileKey(fileType: FILE_ENUM_TYPE, formattedFilename: string) {
    return `${fileType}/${formattedFilename}`;
  }

  /**
   * Get the full url file saved.
   */
  #getSavedURL(fileType: FILE_ENUM_TYPE, formattedFilename: string) {
    return `${this.configService.get(
      's3.publicFileStorageDomain',
    )}/${this.#getFileKey(fileType, formattedFilename)}`;
  }
}
