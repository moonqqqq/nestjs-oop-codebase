import { Prisma } from '@prisma/client';

// export const userQueryIncludeStatement = {};

export type TUserEntity = Prisma.UserEntityGetPayload<{
  //   include: typeof userQueryIncludeStatement;
}>;
