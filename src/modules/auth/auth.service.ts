import { Injectable } from '@nestjs/common';
import { SigninDto } from '../users/dtos/signin.dto';
import { UsersRepository } from '../users/users.repository';
import { JWTService } from '../../share-modules/jwt/jwt.service';
import { WrongLoginCredential } from '../../nestjs-utils/exceptions/service-layer.exception';
import { ErrorBody } from '../../common/constants/error-body';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JWTService,
  ) {}

  async signin(signinDto: SigninDto) {
    const foundUser = await this.usersRepository.findOneById(signinDto.loginId);

    if (!foundUser || !foundUser.checkPasswordCorrect(signinDto.password)) {
      throw new WrongLoginCredential(ErrorBody.WRONG_LOGIN_CREDENTIAL);
    }

    const tokens = await this.jwtService.createJWT({ id: foundUser.getId() });

    return tokens;
  }
}