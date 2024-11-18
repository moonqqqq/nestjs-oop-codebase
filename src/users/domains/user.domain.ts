import { TUserEntity } from '../types/user.type';

export class User {
  readonly id?: string;
  readonly loginId: string;
  readonly password: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;

  constructor(user: {
    readonly id?: string;
    readonly loginId: string;
    readonly password: string;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
  }) {
    this.id = user.id;
    this.loginId = user.loginId;
    this.password = user.password;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }

  static fromEntity(userEntity: TUserEntity) {
    return new User(userEntity);
  }

  getId() {
    return this.id;
  }
}
