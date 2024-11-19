import { TUserProfileEntity } from '../types/user-profile.type';

export class UserProfile {
  readonly _id?: string;
  readonly _name: string;
  readonly _createdAt?: Date;
  readonly _updatedAt?: Date;

  constructor(userProfile: {
    readonly id?: string;
    readonly name: string;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
  }) {
    this._id = userProfile.id;
    this._name = userProfile.name;
    this._createdAt = userProfile.createdAt;
    this._updatedAt = userProfile.updatedAt;
  }

  static fromEntity(userProfileEntity: TUserProfileEntity) {
    return new UserProfile({
      ...userProfileEntity,
    });
  }

  getId() {
    return this._id;
  }
}
