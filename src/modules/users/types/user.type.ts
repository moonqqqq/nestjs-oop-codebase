import { Prisma } from '@prisma/client';

export const userQueryIncludeStatement = {
  profile: true,
};

export type TUserEntity = Prisma.UserEntityGetPayload<{
  include: typeof userQueryIncludeStatement;
}>;
