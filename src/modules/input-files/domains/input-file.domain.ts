import { TInputFileEntity } from '../types/input-file.type';

export class InputFile {
  readonly _id?: string;
  readonly _formattedName: string;
  readonly _originalName: string;
  readonly _path: string;
  readonly _size: string;
  readonly _createdAt?: Date;

  constructor(inputFile: {
    readonly id?: string;
    readonly formattedName: string;
    readonly originalName: string;
    readonly path: string;
    readonly size: string;
    readonly createdAt?: Date;
  }) {
    this._id = inputFile.id;
    this._formattedName = inputFile.formattedName;
    this._originalName = inputFile.originalName;
    this._path = inputFile.path;
    this._size = inputFile.size;
    this._createdAt = inputFile.createdAt;
  }

  static fromEntity(inputFileEntity: TInputFileEntity) {
    return new InputFile({
      ...inputFileEntity,
    });
  }

  getId() {
    return this._id;
  }
}
