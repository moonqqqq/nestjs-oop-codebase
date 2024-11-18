import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './domains/user.domain';
import { CreateUserDto } from './dtos/create-user.dto';
import { CreatedUserDto } from './dtos/created-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(user: CreateUserDto) {
    const newUser = new User({
      loginId: user.loginId,
      password: user.password,
    });

    const createdUser = await this.usersRepository.save(newUser);
    return new CreatedUserDto(createdUser);
  }
}
