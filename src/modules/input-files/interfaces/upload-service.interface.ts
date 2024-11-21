export abstract class IUploadService {
  uploadImageToStorage: (
    file: Express.Multer.File,
  ) => Promise<{ savedURL: string; formattedFilename: string }>;
  uploadFileToStorage: (
    file: Express.Multer.File,
  ) => Promise<{ savedURL: string; formattedFilename: string }>;
}
