import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreatedUserDto } from './dtos/created-user.dto';
import { ApiCreatedDataWrapResponse } from '../nestjs-utils/decorators/api-created-res.decorator';
import { API_ENDPOINT, API_VERSION } from '../common/constants/api-versions';
import { ResWrapSingleDTO } from '../common/dtos/res-wrappers.dto';
import { SigninDto } from './dtos/signin.dto';
import { JWTTokensDto } from './dtos/jwt-token.dto';

@ApiTags(API_ENDPOINT.USERS)
@Controller(`${API_VERSION.ONE}/${API_ENDPOINT.USERS}`)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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
    const jwtTokens = await this.usersService.signin(user);

    return new ResWrapSingleDTO(jwtTokens);
  }
}
