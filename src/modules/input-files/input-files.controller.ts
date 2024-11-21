import { Controller } from '@nestjs/common';
import { InputFilesService } from './input-files.service';
import { ApiTags } from '@nestjs/swagger';
import { API_ENDPOINT, API_VERSION } from '../../common/constants/api-versions';
import { IUploadService } from './interfaces/upload-service.interface';

@ApiTags(API_ENDPOINT.INPUT_FILES)
@Controller(`${API_VERSION.ONE}/${API_ENDPOINT.INPUT_FILES}`)
export class InputFilesController {
  constructor(
    private readonly inputFilesService: InputFilesService,
    private readonly uploadService: IUploadService,
  ) {}
}
