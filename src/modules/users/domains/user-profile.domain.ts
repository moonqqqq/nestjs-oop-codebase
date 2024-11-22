import { InputFile } from '../../input-files/domains/input-file.domain';
import { TUserProfileEntity } from '../types/user-profile.type';

export class UserProfile {
  readonly _id?: string;
  readonly _name: string;
  _image?: InputFile;
  readonly _createdAt?: Date;
  readonly _updatedAt?: Date;

  constructor(userProfile: {
    readonly id?: string;
    readonly name: string;
    readonly image?: InputFile;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
  }) {
    this._id = userProfile.id;
    this._name = userProfile.name;
    this._image = userProfile.image;
    this._createdAt = userProfile.createdAt;
    this._updatedAt = userProfile.updatedAt;
  }

  static fromEntity(userProfileEntity: TUserProfileEntity) {
    const imageDomain = InputFile.fromEntity(userProfileEntity.image);

    return new UserProfile({
      id: userProfileEntity.id,
      name: userProfileEntity.name,
      createdAt: userProfileEntity.createdAt,
      updatedAt: userProfileEntity.updatedAt,

      image: imageDomain,
    });
  }

  getId() {
    return this._id;
  }
}
