import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JWTService } from '../../share-modules/jwt/jwt.service';
import { UsersRepository } from '../users/users.repository';
import { ILoggerService } from '../../share-modules/logger/interface/logger-service.interface';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserProfile } from '../users/domains/user-profile.domain';
import { User } from '../users/domains/user.domain';
import { SigninDto } from '../users/dtos/signin.dto';
import appConfig from '../../config/app.config';
import cacheConfig from '../../config/cache.config';
import utilConfig from '../../config/util.config';
import s3Config from '../../config/s3.config';

describe('AuthService', () => {
  let authService: AuthService;
  let usersRepository: UsersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: '.env.dev',
          load: [appConfig, cacheConfig, utilConfig, s3Config],
        }),
      ],
      providers: [
        AuthService,
        {
          provide: UsersRepository,
          useValue: {
            findOneById: jest.fn(),
          },
        },
        ConfigService,
        JWTService,
        {
          provide: ILoggerService,
          useValue: {
            info: jest.fn(),
            error: jest.fn(),
            warn: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersRepository = module.get<UsersRepository>(UsersRepository);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      // Input
      const signinDto: SigninDto = {
        loginId: 'testLoginId',
        password: 'testPassword',
      };

      // Mock data
      const now = new Date();
      const MockUserProfile = new UserProfile({
        id: 'mockId1',
        name: 'mockName',
        createdAt: now,
        updatedAt: now,
      });
      const MockFoundUser = new User({
        id: 'mockId2',
        loginId: signinDto.loginId,
        password: signinDto.password,
        profile: MockUserProfile,
        createdAt: now,
        updatedAt: now,
      });

      // Mock the repository save function
      usersRepository.findOneById = jest.fn().mockResolvedValue(MockFoundUser);

      const result = await authService.signin(signinDto);

      expect(result).toHaveProperty('accessToken');
      expect(result).toHaveProperty('refreshToken');
    });
  });
});
