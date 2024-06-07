import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

export class ResWrapSingleDTO<T> {
  @Exclude() private readonly _data: T;

  constructor(data: T) {
    this._data = data;
  }

  @ApiProperty()
  @Expose()
  get data(): T {
    return this._data;
  }
}

export class ResWrapSingleAndMetadataDTO<T, P> {
  @Exclude() private readonly _data: T;
  @Exclude() private readonly _metadata: P;

  constructor(data: T, metadata: P) {
    this._data = data;
    this._metadata = metadata;
  }

  @ApiProperty()
  @Expose()
  get metadata(): P {
    return this._metadata;
  }

  @ApiProperty()
  @Expose()
  get data(): T {
    return this._data;
  }
}

export class ResWrapListDTO<T> {
  @Exclude() private readonly _data: T[];

  constructor(data: T[]) {
    this._data = data;
  }

  @ApiProperty()
  @Expose()
  get data(): T[] {
    return this._data;
  }
}

export class ResWrapListAndMetadataDTO<T, P> {
  @Exclude() private readonly _metadata: P;
  @Exclude() private readonly _data: T[];

  constructor(metadata: P, data: T[]) {
    this._metadata = metadata;
    this._data = data;
  }

  @ApiProperty()
  @Expose()
  get metadata(): P {
    return this._metadata;
  }

  @ApiProperty()
  @Expose()
  get data(): T[] {
    return this._data;
  }
}

// TODO: listAndPagination
