export abstract class IUploadService {
  uploadImageToStorage: (
    file: Express.Multer.File,
  ) => Promise<{ savedURL: string; formattedFilename: string }>;
  uploadAttachmentToStorage: (
    file: Express.Multer.File,
  ) => Promise<{ savedURL: string; formattedFilename: string }>;
}
