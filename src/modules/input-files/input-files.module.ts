import { Module } from '@nestjs/common';
import { InputFilesService } from './input-files.service';
import { InputFilesController } from './input-files.controller';
import { InputFilesRepository } from './input-files.repository';
import { S3Service } from './upload.service';
import { IUploadService } from './interfaces/upload-service.interface';
import { LoggerModule } from '../../share-modules/logger/logger.module';

@Module({
  imports: [LoggerModule],
  controllers: [InputFilesController],
  providers: [
    InputFilesService,
    InputFilesRepository,
    {
      provide: IUploadService,
      useClass: S3Service,
    },
  ],
})
export class InputFilesModule {}