import {
  PipeTransform,
  Injectable,
  UnprocessableEntityException,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
  maxMb: number;
  constructor(maxMb: number) {
    this.maxMb = maxMb;
  }

  transform(file: Express.Multer.File) {
    if (!file)
      throw new BadRequestException({
        errorCode: 'NO_FILE',
        message: 'There is no file',
      });

    if (file.size > this.maxMb * 1000 * 1000)
      throw new UnprocessableEntityException({
        errorCode: 'EXCEED_MAX_SIZE',
        message: `File is exceed max size(${this.maxMb}MB)`,
      });

    return file;
  }
}
