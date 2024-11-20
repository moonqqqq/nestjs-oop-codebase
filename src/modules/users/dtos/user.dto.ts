import { Exclude } from 'class-transformer';
import { User } from '../domains/user.domain';
import { ApiProperty } from '@nestjs/swagger';

export class FoundsUserDto {
  @ApiProperty({
    example: '1',
    description: 'user id',
  })
  readonly id: string;

  @ApiProperty({
    example: 'loginid123',
    description: 'login id',
  })
  readonly loginId: string;

  @Exclude()
  readonly password: string;

  @ApiProperty({
    example: '2024-01-01',
    description: 'created at',
  })
  readonly createdAt: Date;

  @ApiProperty({
    example: '2024-01-01',
    description: 'updated at',
  })
  readonly updatedAt: Date;

  constructor(user: User) {
    this.id = user._id;
    this.loginId = user._loginId;
    this.password = user._password;
    this.createdAt = user._createdAt;
    this.updatedAt = user._updatedAt;
  }
}
