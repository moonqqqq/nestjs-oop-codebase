import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './domains/user.domain';
import { CreateUserDTO } from './dtos/create-user.dto';
import { CreatedUserDTO } from './dtos/created-user.dto';
import { UserProfile } from './domains/user-profile.domain';
import { InputFilesRepository } from '../input-files/input-files.repository';
import {
  NotExistingFile,
  NotExistingUser,
} from '../../nestjs-utils/exceptions/service-layer.exception';
import { ErrorBody } from '../../common/constants/error-body';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly inputFilesRepository: InputFilesRepository,
  ) {}

  async createUser(user: CreateUserDTO) {
    const newUserProfile = new UserProfile({
      name: user.name,
    });

    const newUser = new User({
      loginId: user.loginId,
      password: user.password,
      profile: newUserProfile,
    });

    const createdUser = await this.usersRepository.save(newUser);
    return new CreatedUserDTO(createdUser);
  }

  async setProfileImage(userId: string, fileId: string) {
    const [user, image] = await Promise.all([
      this.usersRepository.findOneById(userId),
      this.inputFilesRepository.findOneById(fileId),
    ]);

    if (!user) throw new NotExistingUser(ErrorBody.NOT_EXISTING_USER);

    if (!image) throw new NotExistingFile(ErrorBody.NOT_EXISTING_FILE);

    user.setProfileImage(image);

    return await this.usersRepository.save(user);
  }
}
