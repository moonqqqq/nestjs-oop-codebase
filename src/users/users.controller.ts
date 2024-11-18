import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreatedUserDto } from './dtos/created-user.dto';
import { ApiCreatedDataWrapResponse } from '../nestjs-utils/decorators/api-created-res.decorator';
import { API_ENDPOINT, API_VERSION } from '../common/constants/api-versions';
import { ResWrapSingleDTO } from '../common/dtos/res-wrappers.dto';

@ApiTags(API_ENDPOINT.USERS)
@Controller(`${API_VERSION.ONE}/${API_ENDPOINT.USERS}`)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a User' })
  @ApiCreatedDataWrapResponse(CreatedUserDto)
  async createUser(@Body() user: CreateUserDto) {
    const createdUser = await this.usersService.createUser(user);

    return new ResWrapSingleDTO(createdUser);
  }
}
