import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './domains/user.domain';
import { CreateUserDto } from './dtos/create-user.dto';
import { CreatedUserDto } from './dtos/created-user.dto';
import { UserProfile } from './domains/user-profile.domain';
import { SigninDto } from './dtos/signin.dto';
import { WrongLoginCredential } from '../nestjs-utils/exceptions/service-layer.exception';
import { ErrorBody } from '../common/constants/error-body';
import { JwtService } from '../share-modules/jwt/jwt.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(user: CreateUserDto) {
    const newUserProfile = new UserProfile({
      name: user.name,
    });

    const newUser = new User({
      loginId: user.loginId,
      password: user.password,
      profile: newUserProfile,
    });

    const createdUser = await this.usersRepository.save(newUser);
    return new CreatedUserDto(createdUser);
  }

  async signin(user: SigninDto) {
    const foundUser = await this.usersRepository.findOneById(user.loginId);

    if (!foundUser || foundUser.getPassword() !== user.password) {
      throw new WrongLoginCredential(ErrorBody.WRONG_LOGIN_CREDENTIAL);
    }

    const tokens = await this.jwtService.createJWT({ id: foundUser.getId() });

    return tokens;
  }
}
