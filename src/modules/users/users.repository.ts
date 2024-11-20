import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../share-modules/database/prisma/prisma.service';
import { User } from './domains/user.domain';
import { TUserEntity, userQueryIncludeStatement } from './types/user.type';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findOneById(loginId: string) {
    const userEntity = await this.prisma.userEntity.findUnique({
      where: { loginId },
      include: userQueryIncludeStatement,
    });

    if (!userEntity) return null;

    return User.fromEntity(userEntity);
  }

  async save(userDomain: User) {
    let userEntity: TUserEntity;
    if (userDomain.getId()) {
      userEntity = await this.#update(userDomain);
    } else {
      userEntity = await this.#create(userDomain);
    }
    return User.fromEntity(userEntity);
  }

  async #create(user: User) {
    const userPayload: Prisma.UserEntityCreateInput = {
      loginId: user._loginId,
      password: user._password,
      profile: {
        create: {},
      },
    };

    return await this.prisma.userEntity.create({
      data: userPayload,
      include: userQueryIncludeStatement,
    });
  }

  // additional flow will be set if logic added
  async #update(user: User) {
    const userPayload: Prisma.UserEntityUpdateInput = {
      loginId: user._loginId,
      password: user._password,
    };

    return await this.prisma.userEntity.update({
      where: { id: user.getId() },
      data: userPayload,
      include: userQueryIncludeStatement,
    });
  }
}
