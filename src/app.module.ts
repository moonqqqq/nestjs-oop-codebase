import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import appConfig from './config/app.config';
import cacheConfig from './config/cache.config';
import s3Config from './config/s3.config';
import utilConfig from './config/util.config';
import { AuthModule } from './modules/auth/auth.module';
import { InputFilesModule } from './modules/input-files/input-files.module';
import { UsersModule } from './modules/users/users.module';
import { reqResLogMiddleware } from './nestjs-utils/middleware/req-res-log.middleware';
import { CacheModule } from './share-modules/cache/cache.module';
import { DatabaseModule } from './share-modules/database/database.module';
import { LoggerModule } from './share-modules/logger/logger.module';
import { OtpModule } from './share-modules/otp/otp.module';
import { SmsModule } from './share-modules/sms/sms.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.prod',
      // ignoreEnvFile: process.env.NODE_ENV === 'prod', // Store produnction env on cicd pipeline
      load: [appConfig, cacheConfig, utilConfig, s3Config],
    }),
    LoggerModule,
    CacheModule,
    DatabaseModule,
    SmsModule,
    OtpModule,
    UsersModule,
    AuthModule,
    InputFilesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(reqResLogMiddleware).forRoutes('*');
  }
}
