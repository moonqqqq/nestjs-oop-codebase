import { Type, applyDecorators } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiExtraModels,
  getSchemaPath,
} from '@nestjs/swagger';
import { DataResDTO } from '../../common/dtos/data-res.dto';

export const ApiCreatedDataWrapResponse = <DataDTO extends Type<unknown>>(
  dataDTO: DataDTO,
) =>
  applyDecorators(
    ApiExtraModels(DataResDTO, dataDTO),
    ApiCreatedResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(DataResDTO) },
          {
            properties: {
              data: {
                $ref: getSchemaPath(dataDTO),
              },
            },
          },
        ],
      },
    }),
  );
