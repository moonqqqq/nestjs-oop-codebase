import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JWTService } from '../../share-modules/jwt/jwt.service';
import { UsersRepository } from '../users/users.repository';
import { WinstonLoggerService } from '../../share-modules/logger/winston/winston-logger.service';
import { ILoggerService } from '../../share-modules/logger/interface/logger-service.interface';
import { ConfigService } from '@nestjs/config';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: ILoggerService,
          useValue: WinstonLoggerService,
        },
        {
          provide: UsersRepository,
          useValue: {
            // add mock functions
          },
        },
        JWTService,
        ConfigService,
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
