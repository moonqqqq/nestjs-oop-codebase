import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../share-modules/database/prisma/prisma.service';
import { User } from './domains/user.domain';
import { TUserEntity, userQueryIncludeStatement } from './types/user.type';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findOneById(id: string) {
    const userEntity = await this.prisma.userEntity.findUnique({
      where: { id },
      include: userQueryIncludeStatement,
    });

    if (!userEntity) return null;

    return User.fromEntity(userEntity);
  }

  async findOneByLoginId(loginId: string) {
    const userEntity = await this.prisma.userEntity.findUnique({
      where: { loginId },
      include: userQueryIncludeStatement,
    });

    if (!userEntity) return null;

    return User.fromEntity(userEntity);
  }

  async save(user: User) {
    let userEntity: TUserEntity;
    if (user.getId()) {
      userEntity = await this.#update(user);
    } else {
      userEntity = await this.#create(user);
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

  async #update(user: User) {
    // 이미지 ID가 변경된 경우에만 connect를 수행
    const imageUpdate =
      user._profile._image.getId() !== user._profile._image.getId()
        ? { connect: { id: user._profile._image.getId() } }
        : undefined;

    const userPayload: Prisma.UserEntityUpdateInput = {
      loginId: user._loginId,
      password: user._password,
      profile: {
        update: {
          name: user._profile._name,
          image: imageUpdate, // 변경된 경우에만 업데이트
        },
      },
    };

    return await this.prisma.userEntity.update({
      where: { id: user.getId() },
      data: userPayload,
      include: userQueryIncludeStatement,
    });
  }
}
