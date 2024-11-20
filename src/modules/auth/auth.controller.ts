import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiCreatedDataWrapResponse } from '../../nestjs-utils/decorators/api-created-res.decorator';
import { API_ENDPOINT, API_VERSION } from '../../common/constants/api-versions';
import { ResWrapSingleDTO } from '../../common/dtos/res-wrappers.dto';
import { UsersService } from '../users/users.service';
import { CreatedUserDto } from '../users/dtos/created-user.dto';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { JWTTokensDto } from '../users/dtos/jwt-token.dto';
import { SigninDto } from '../users/dtos/signin.dto';

@ApiTags(API_ENDPOINT.AUTH)
@Controller(`${API_VERSION.ONE}/${API_ENDPOINT.AUTH}`)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('signup')
  @ApiOperation({ summary: 'signup' })
  @ApiCreatedDataWrapResponse(CreatedUserDto)
  async signup(@Body() user: CreateUserDto) {
    const createdUser = await this.usersService.createUser(user);

    return new ResWrapSingleDTO(createdUser);
  }

  @Post('signin')
  @ApiOperation({ summary: 'Signin' })
  @ApiCreatedDataWrapResponse(JWTTokensDto)
  async signin(@Body() user: SigninDto) {
    const jwtTokens = await this.authService.signin(user);

    return new ResWrapSingleDTO(jwtTokens);
  }
}
