import { Module } from '@nestjs/common';
import { UsersCommonService } from './services/users-common.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { InputFilesModule } from '../input-files/input-files.module';
import { UserProfilesService } from './services/user-profiles.service';

@Module({
  imports: [InputFilesModule],
  controllers: [UsersController],
  providers: [UsersCommonService, UsersRepository, UserProfilesService],
  exports: [UsersRepository, UsersCommonService],
})
export class UsersModule {}
