import { Injectable } from '@nestjs/common';
import { PrismaService } from '../share-modules/database/prisma/prisma.service';
import { User } from './domains/user.domain';
import { TUserEntity } from './types/user.type';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(userDomain: User) {
    let userEntity: TUserEntity;
    if (userDomain.getId()) {
      userEntity = await this.update(userDomain);
    } else {
      userEntity = await this.create(userDomain);
    }
    return User.fromEntity(userEntity);
  }

  async create(user: User) {
    return await this.prisma.userEntity.create({
      data: user,
    });
  }

  // additional flow will be set if logic added
  async update(user: User) {
    return await this.prisma.userEntity.update({
      where: { id: user.getId() },
      data: user,
    });
  }
}
