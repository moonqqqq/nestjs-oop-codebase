import { InputFile } from '../../input-files/domains/input-file.domain';
import { TUserEntity } from '../types/user.type';
import { UserProfile } from './user-profile.domain';

export class User {
  readonly _id?: string;
  readonly _loginId: string;
  readonly _password: string;
  readonly _profile: UserProfile;
  readonly _createdAt?: Date;
  readonly _updatedAt?: Date;

  constructor(user: {
    readonly id?: string;
    readonly loginId: string;
    readonly password: string;
    readonly profile: UserProfile;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
  }) {
    this._id = user.id;
    this._loginId = user.loginId;
    this._password = user.password;
    this._profile = user.profile;
    this._createdAt = user.createdAt;
    this._updatedAt = user.updatedAt;
  }

  static fromEntity(userEntity: TUserEntity) {
    const userProfile = UserProfile.fromEntity(userEntity.profile);

    return new User({
      ...userEntity,
      profile: userProfile,
    });
  }

  getId() {
    return this._id;
  }

  checkPasswordCorrect(password: string) {
    return this._password === password;
  }

  setProfileImage(image: InputFile) {
    this._profile._image = image;
  }

  updateProfile(payload: Partial<{ name: string; email: string }>) {
    if (payload.name) this._profile._name = payload.name;
    if (payload.email) this._profile._name = payload.email;
  }
}
