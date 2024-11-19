import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dtos/create-user.dto';
import { CreatedUserDto } from './dtos/created-user.dto';
import { User } from './domains/user.domain';
import { UserProfile } from './domains/user-profile.domain';

describe('UsersService', () => {
  let usersService: UsersService;
  let usersRepository: UsersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useValue: {
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    usersRepository = module.get<UsersRepository>(UsersRepository);
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a new user and return a CreatedUserDto', async () => {
      // Input
      const createUserDto: CreateUserDto = {
        loginId: 'testLoginId',
        password: 'testPassword',
        name: 'testName',
      };

      // Mock Output
      // Assuming Prisma auto-generates _id, createdAt, updatedAt
      const now = new Date();
      const MockUserProfile = new UserProfile({
        id: 'mockId1',
        name: createUserDto.name,
        createdAt: now,
        updatedAt: now,
      });
      const MockCreatedUser = new User({
        id: 'mockId2',
        loginId: createUserDto.loginId,
        password: createUserDto.password,
        profile: MockUserProfile,
        createdAt: now,
        updatedAt: now,
      });

      // Mock the repository save function
      usersRepository.save = jest.fn().mockResolvedValue(MockCreatedUser);

      const result = await usersService.createUser(createUserDto);

      const ExpectedCreatedUserDto = new CreatedUserDto(MockCreatedUser);

      expect(result).toEqual(ExpectedCreatedUserDto);
      expect(result.id).toBeDefined();
      expect(result.createdAt).toBeDefined();
      expect(result.updatedAt).toBeDefined();

      /**
       * below commented code is bad case. testing inner function is called or not is bad.
       * we should test the result of the function.
       * we should not test code.
       */
      // expect(usersRepository.save).toHaveBeenCalledWith(createUserDto);
    });
  });
});
