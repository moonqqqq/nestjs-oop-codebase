import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class KeywordQueryDto {
  @ApiPropertyOptional({ example: 'search keyword' })
  @IsString()
  @IsOptional()
  keyword: string;
}
