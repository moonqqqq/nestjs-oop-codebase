import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { InputFilesService } from './input-files.service';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { API_ENDPOINT, API_VERSION } from '../../common/constants/api-versions';
import { IUploadService } from './interfaces/upload-service.interface';
import { ResWrapSingleDTO } from '../../common/dtos/res-wrappers.dto';
import { InputFileResDTO } from './dtos/input-file.dto';
import { ApiCreatedDataWrapResponse } from '../../nestjs-utils/decorators/api-created-res.decorator';
import { FileSizeValidationPipe } from '../../nestjs-utils/pipe/file-size-validation.pipe';
import { FileInterceptor } from '@nestjs/platform-express';
import { BODY_INPUT_TYPE } from '../../common/constants/swagger';
import { FileUploadDTO } from './interfaces/dtos/file-upload.dto';
import { FileExtensionValidationPipe } from '../../nestjs-utils/pipe/file-extension-validation.pipe';

@ApiTags(API_ENDPOINT.INPUT_FILES)
@Controller(`${API_VERSION.ONE}/${API_ENDPOINT.INPUT_FILES}`)
export class InputFilesController {
  constructor(
    private readonly inputFilesService: InputFilesService,
    private readonly uploadService: IUploadService,
  ) {}

  @Post('image')
  @ApiOperation({ summary: 'upload an image' })
  @ApiConsumes(BODY_INPUT_TYPE.MULTIPART_FORMDATA)
  @ApiBody({
    description: 'A image file',
    type: FileUploadDTO,
  })
  @ApiCreatedDataWrapResponse(InputFileResDTO)
  @UsePipes(
    new FileSizeValidationPipe(5),
    new FileExtensionValidationPipe(['.png', '.jpg', '.jpeg']),
  )
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    const savedInfo = await this.uploadService.uploadImageToStorage(file);

    const createdInputFile = await this.inputFilesService.create(
      file,
      savedInfo,
    );

    return new ResWrapSingleDTO(createdInputFile);
  }
}
