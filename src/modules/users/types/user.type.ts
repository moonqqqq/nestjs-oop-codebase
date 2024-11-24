import { Prisma } from '@prisma/client';

export const userQueryIncludeStatement = {
  profile: {
    include: {
      image: true,
    },
  },
};

export type TUserEntity = Prisma.UserEntityGetPayload<{
  include: typeof userQueryIncludeStatement;
}>;
