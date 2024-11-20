import { Global, Module } from '@nestjs/common';
import { LoggerModule } from '../logger/logger.module';
import { JWTService } from './jwt.service';

@Global()
@Module({
  imports: [LoggerModule],
  providers: [JWTService],
  exports: [JWTService],
})
export class JWTModule {}
