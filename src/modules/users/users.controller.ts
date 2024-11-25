import { Controller } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { ApiTags } from '@nestjs/swagger';
import { API_ENDPOINT, API_VERSION } from '../../common/constants/api-versions';

@ApiTags(API_ENDPOINT.USERS)
@Controller(`${API_VERSION.ONE}/${API_ENDPOINT.USERS}`)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  async setProfileImage() {}
}
