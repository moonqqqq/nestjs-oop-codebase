export abstract class BaseDomain {
  readonly _id?: string;

  constructor(id?: string) {
    this._id = id;
  }

  getId(): string | undefined {
    return this._id;
  }
}
