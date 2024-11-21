import { Injectable } from '@nestjs/common';
import { InputFilesRepository } from './input-files.repository';
import { InputFile } from './domains/input-file.domain';
import { InputFileResDTO } from './dtos/input-file.dto';

@Injectable()
export class InputFilesService {
  constructor(private readonly inputFilesRepository: InputFilesRepository) {}

  async create(
    originalInputFile: Express.Multer.File,
    savedInfo: { savedURL: string; formattedFilename: string },
  ) {
    const newInputFile = new InputFile({
      formattedName: savedInfo.formattedFilename,
      originalName: originalInputFile.originalname,
      path: savedInfo.savedURL,
      size: String(originalInputFile.size),
    });

    const createdInputFile = await this.inputFilesRepository.save(newInputFile);

    return new InputFileResDTO(createdInputFile);
  }
}
