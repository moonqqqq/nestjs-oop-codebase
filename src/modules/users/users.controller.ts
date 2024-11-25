import { Controller } from '@nestjs/common';
import { UsersCommonService } from './services/users-common.service';
import { ApiTags } from '@nestjs/swagger';
import { API_ENDPOINT, API_VERSION } from '../../common/constants/api-versions';

@ApiTags(API_ENDPOINT.USERS)
@Controller(`${API_VERSION.ONE}/${API_ENDPOINT.USERS}`)
export class UsersController {
  constructor(private readonly usersCommonService: UsersCommonService) {}
}
