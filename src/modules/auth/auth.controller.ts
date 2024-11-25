import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiCreatedDataWrapResponse } from '../../nestjs-utils/decorators/api-created-res.decorator';
import { API_ENDPOINT, API_VERSION } from '../../common/constants/api-versions';
import { ResWrapSingleDTO } from '../../common/dtos/res-wrappers.dto';
import { UsersCommonService } from '../users/users.service';
import { CreatedUserDTO } from '../users/dtos/created-user.dto';
import { CreateUserDTO } from '../users/dtos/create-user.dto';
import { JWTTokensDTO } from '../users/dtos/jwt-token.dto';
import { SigninDTO } from '../users/dtos/signin.dto';

@ApiTags(API_ENDPOINT.AUTH)
@Controller(`${API_VERSION.ONE}/${API_ENDPOINT.AUTH}`)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersCommonService: UsersCommonService,
  ) {}

  @Post('signup')
  @ApiOperation({ summary: 'signup' })
  @ApiCreatedDataWrapResponse(CreatedUserDTO)
  async signup(@Body() signupDTO: CreateUserDTO) {
    const createdUser = await this.usersCommonService.createUser(signupDTO);

    return new ResWrapSingleDTO(createdUser);
  }

  @Post('signin')
  @ApiOperation({ summary: 'Signin' })
  @ApiCreatedDataWrapResponse(JWTTokensDTO)
  async signin(@Body() signinDTO: SigninDTO) {
    const jwtTokens = await this.authService.signin(signinDTO);

    return new ResWrapSingleDTO(jwtTokens);
  }
}
