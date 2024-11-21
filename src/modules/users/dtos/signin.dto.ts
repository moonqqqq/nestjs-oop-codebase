import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SigninDTO {
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
