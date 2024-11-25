import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { InputFilesModule } from '../input-files/input-files.module';
import { UserProfilesService } from './services/user-profiles.service';

@Module({
  imports: [InputFilesModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, UserProfilesService],
  exports: [UsersRepository, UsersService],
})
export class UsersModule {}
