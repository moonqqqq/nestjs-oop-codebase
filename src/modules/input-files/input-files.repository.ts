import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../share-modules/database/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { InputFile } from './domains/input-file.domain';
import { TInputFileEntity } from './types/input-file.type';

@Injectable()
export class InputFilesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findOneById(id: string) {
    const inputFile = await this.prisma.inputFileEntity.findFirst({
      where: {
        id,
      },
    });

    if (!inputFile) null;

    return InputFile.fromEntity(inputFile);
  }

  async save(inputFile: InputFile): Promise<InputFile> {
    const inputFileEntity = await (inputFile._id
      ? this.#update(inputFile)
      : this.#create(inputFile));

    return InputFile.fromEntity(inputFileEntity);
  }

  async #create(inputFile: InputFile): Promise<TInputFileEntity> {
    const inputFilePayload: Prisma.InputFileEntityCreateInput = {
      formattedName: inputFile._formattedName,
      originalName: inputFile._originalName,
      path: inputFile._path,
      size: inputFile._size,
    };

    return await this.prisma.inputFileEntity.create({
      data: inputFilePayload,
    });
  }

  async #update(inputFile: InputFile): Promise<TInputFileEntity> {
    const inputFilePayload: Prisma.InputFileEntityUpdateInput = {
      formattedName: inputFile._formattedName,
      originalName: inputFile._originalName,
      path: inputFile._path,
      size: inputFile._size,
    };

    return await this.prisma.inputFileEntity.update({
      where: { id: inputFile._id },
      data: inputFilePayload,
    });
  }
}
