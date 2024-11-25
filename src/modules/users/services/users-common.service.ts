import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../users.repository';
import { User } from '../domains/user.domain';
import { CreateUserDTO } from '../dtos/create-user.dto';
import { CreatedUserDTO } from '../dtos/created-user.dto';
import { UserProfile } from '../domains/user-profile.domain';

@Injectable()
export class UsersCommonService {
  constructor(private readonly usersRepository: UsersRepository) {}

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
}
