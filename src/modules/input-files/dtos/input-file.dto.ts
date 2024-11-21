import { Expose } from 'class-transformer';
import { InputFile } from '../domains/input-file.domain';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class InputFileResDTO {
  @Expose()
  @ApiProperty({ example: 'dfjioef-enfkldf' })
  @IsNotEmpty()
  readonly id: string;

  @Expose()
  @ApiProperty({ example: 'Bearer awfhiosdjfiomeoiwe' })
  @IsNotEmpty()
  readonly formattedName: string;

  @Expose()
  @ApiProperty({ example: 'Bearer awfhiosdjfiomeoiwe' })
  @IsNotEmpty()
  readonly originalName: string;

  @Expose()
  @ApiProperty({ example: 'Bearer awfhiosdjfiomeoiwe' })
  @IsNotEmpty()
  readonly path: string;

  @Expose()
  @ApiProperty({ example: 'Bearer awfhiosdjfiomeoiwe' })
  @IsNotEmpty()
  readonly size: string;

  @Expose()
  @ApiProperty({ example: 'Bearer awfhiosdjfiomeoiwe' })
  @IsNotEmpty()
  readonly createdAt: Date;

  constructor(inputFile: InputFile) {
    this.id = inputFile._id;
    this.formattedName = inputFile._formattedName;
    this.originalName = inputFile._originalName;
    this.path = inputFile._path;
    this.size = inputFile._size;
    this.createdAt = inputFile._createdAt;
  }
}
