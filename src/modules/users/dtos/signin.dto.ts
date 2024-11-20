import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SigninDto {
  @ApiProperty({
    example: 'loginid123',
    description: 'login id',
  })
  @IsString()
  readonly loginId: string;

  @ApiProperty({
    example: 'password123',
    description: 'password',
  })
  @IsString()
  readonly password: string;
}
