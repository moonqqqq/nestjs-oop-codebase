import { Prisma } from '@prisma/client';

export type TUserProfileEntity = Prisma.UserProfileEntityGetPayload<{
  include: {
    image: true;
  };
}>;
