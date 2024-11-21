import {
  PipeTransform,
  Injectable,
  UnprocessableEntityException,
  BadRequestException,
} from '@nestjs/common';
import * as path from 'path';

@Injectable()
export class FileExtensionValidationPipe implements PipeTransform {
  availableExtensions: string[];
  constructor(availableExtensions: string[]) {
    this.availableExtensions = availableExtensions;
  }

  transform(file: Express.Multer.File) {
    if (!file)
      throw new BadRequestException({
        errorCode: 'NO_FILE',
        message: 'There is no file',
      });

    const extension = path.extname(file.originalname);

    if (!this.availableExtensions.includes(extension))
      throw new UnprocessableEntityException({
        errorCode: 'INVALID_FILE_EXTENSION',
        message: `File extension is invalid. Available extensions: ${this.availableExtensions.join(', ')}`,
      });

    return file;
  }
}
