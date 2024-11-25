import { Test, TestingModule } from '@nestjs/testing';
import { UsersRepository } from '../users.repository';
import { User } from '../domains/user.domain';
import { UserProfile } from '../domains/user-profile.domain';
import { ILoggerService } from '../../../share-modules/logger/interface/logger-service.interface';
import { WinstonLoggerService } from '../../../share-modules/logger/winston/winston-logger.service';
import { InputFilesRepository } from '../../input-files/input-files.repository';
import {
  NotExistingFile,
  NotExistingUser,
} from '../../../nestjs-utils/exceptions/service-layer.exception';
import { InputFile } from '../../input-files/domains/input-file.domain';
import { UserProfilesService } from './user-profiles.service';

describe('UsersCommonService', () => {
  let userProfilesService: UserProfilesService;
  let usersRepository: UsersRepository;
  let inputFilesRepository: InputFilesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserProfilesService,
        {
          provide: UsersRepository,
          useValue: {
            findOneByLoginId: jest.fn(),
            findOneById: jest.fn(),
          },
        },
        {
          provide: ILoggerService,
          useValue: WinstonLoggerService,
        },
        {
          provide: InputFilesRepository,
          useValue: {
            findOneById: jest.fn(),
          },
        },
      ],
    }).compile();

    userProfilesService = module.get<UserProfilesService>(UserProfilesService);
    usersRepository = module.get<UsersRepository>(UsersRepository);
    inputFilesRepository =
      module.get<InputFilesRepository>(InputFilesRepository);
  });

  it('should be defined', () => {
    expect(UserProfilesService).toBeDefined();
  });

  describe('setProfileImage', () => {
    it('wrong file Id => NotExistingFile', async () => {
      // Input
      const userId = 'userId';
      const imageId = 'imageId';

      // Mock Output
      // Assuming Prisma auto-generates _id, createdAt, updatedAt
      const now = new Date();
      const MockUserProfile = new UserProfile({
        id: 'mockId1',
        name: 'mockName',
        createdAt: now,
        updatedAt: now,
      });
      const MockfoundUser = new User({
        id: 'mockId2',
        loginId: 'mockLoginId',
        password: 'mockPassword',
        profile: MockUserProfile,
        createdAt: now,
        updatedAt: now,
      });

      // Mock the repository save function
      usersRepository.findOneById = jest.fn().mockResolvedValue(MockfoundUser);
      inputFilesRepository.findOneById = jest.fn().mockResolvedValue(null);
      // usersRepository.save = jest.fn().mockResolvedValue(MockfoundUser); // this case is checking exception. so doesn't need result mocking

      let result;
      try {
        result = await userProfilesService.setProfileImage(userId, imageId);
      } catch (err) {
        expect(err).toBeInstanceOf(NotExistingFile);
      }

      expect(result).toBeUndefined();
    });

    it('wrong userId => NotExistingUser', async () => {
      // Input
      const userId = 'userId';
      const imageId = 'imageId';

      // Mock Output
      // Assuming Prisma auto-generates _id, createdAt, updatedAt
      const now = new Date();
      const MockImage = new InputFile({
        id: 'mockId1',
        formattedName: 'mockFormattedName',
        originalName: 'mockOriginalName',
        path: 'mockPath',
        size: 'mockSize',
        createdAt: now,
      });

      // Mock the repository save function
      usersRepository.findOneById = jest.fn().mockResolvedValue(null);
      inputFilesRepository.findOneById = jest.fn().mockResolvedValue(MockImage);

      let result;
      try {
        result = await userProfilesService.setProfileImage(userId, imageId);
      } catch (err) {
        expect(err).toBeInstanceOf(NotExistingUser);
      }

      expect(result).toBeUndefined();
    });
  });
});
