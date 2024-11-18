import { TUserEntity } from '../types/user.type';

export class User {
  readonly _id?: string;
  readonly _loginId: string;
  readonly _password: string;
  readonly _createdAt?: Date;
  readonly _updatedAt?: Date;

  constructor(user: {
    readonly id?: string;
    readonly loginId: string;
    readonly password: string;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
  }) {
    this._id = user.id;
    this._loginId = user.loginId;
    this._password = user.password;
    this._createdAt = user.createdAt;
    this._updatedAt = user.updatedAt;
  }

  static fromEntity(userEntity: TUserEntity) {
    return new User(userEntity);
  }

  getId() {
    return this._id;
  }
}
