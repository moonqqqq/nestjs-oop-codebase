import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserDTO {
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

  @ApiProperty({
    example: 'kim heal',
    description: 'name',
  })
  @IsString()
  readonly name: string;
}
