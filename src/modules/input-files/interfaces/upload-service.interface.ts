export abstract class IUploadService {
  uploadImage: (
    file: Express.Multer.File,
  ) => Promise<{ savedURL: string; formattedFilename: string }>;
  uploadFile: (
    file: Express.Multer.File,
  ) => Promise<{ savedURL: string; formattedFilename: string }>;
}
