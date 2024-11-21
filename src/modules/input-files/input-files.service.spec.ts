import { Test, TestingModule } from '@nestjs/testing';
import { InputFilesService } from './services/input-files.service';
import { InputFilesRepository } from './input-files.repository';
import { InputFileResDTO } from './dtos/input-file.dto';
import { InputFile } from './domains/input-file.domain';
import { IUploadService } from './interfaces/upload-service.interface';

describe('InputFilesService', () => {
  let inputFileService: InputFilesService;
  let inputFilesRepository: InputFilesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InputFilesService,
        {
          provide: InputFilesRepository,
          useValue: {
            save: jest.fn(),
          },
        },
        {
          provide: IUploadService,
          useValue: {
            uploadImage: jest.fn(),
          },
        },
      ],
    }).compile();

    inputFileService = module.get<InputFilesService>(InputFilesService);
    inputFilesRepository =
      module.get<InputFilesRepository>(InputFilesRepository);
  });

  it('should be defined', () => {
    expect(inputFileService).toBeDefined();
  });

  describe('uploadImage', () => {
    it('should create input file', async () => {
      // Input mock file
      const mockFile = {
        originalname: 'testOriginalName',
        size: 100,
      } as Express.Multer.File;

      // Mock Output
      // Assuming Prisma auto-generates _id, createdAt, updatedAt
      const now = new Date();

      const MockCreatedInputFile = new InputFile({
        id: 'mockId',
        formattedName: 'mockFormattedName',
        originalName: 'mockOriginalName',
        path: 'mockPath',
        size: 'mockSize',
        createdAt: now,
      });

      // Mock the repository save function

      inputFilesRepository.save = jest
        .fn()
        .mockResolvedValue(MockCreatedInputFile);

      const result = await inputFileService.create(mockFile, {
        savedURL: 'mockSavedURL',
        formattedFilename: 'mockFormattedFilename',
      });

      expect(result).toBeInstanceOf(InputFileResDTO);
    });
  });
});
