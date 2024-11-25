import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../users.repository';
import { InputFilesRepository } from '../../input-files/input-files.repository';
import {
  NotExistingFile,
  NotExistingUser,
} from '../../../nestjs-utils/exceptions/service-layer.exception';
import { ErrorBody } from '../../../common/constants/error-body';

@Injectable()
export class UserProfilesService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly inputFilesRepository: InputFilesRepository,
  ) {}

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
