import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JWTModule } from '../../share-modules/jwt/jwt.module';

@Module({
  imports: [UsersModule, JWTModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
