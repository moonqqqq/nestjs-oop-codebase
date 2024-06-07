/*
  Warnings:

  - The values [CURE,NOT_BEDSORES] on the enum `BedsoreLevel` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "BedsoreLevel_new" AS ENUM ('PREVENTION', 'ONE', 'TWO', 'THREE', 'FOUR', 'DEEP_TISSUE_DAMAGE', 'UNCLASSIFIED', 'DEVICE_BEDSORE', 'CURED', 'ETC');
ALTER TABLE "BedsoreRecord" ALTER COLUMN "level" TYPE "BedsoreLevel_new" USING ("level"::text::"BedsoreLevel_new");
ALTER TABLE "BedsoreManagementGuide" ALTER COLUMN "level" TYPE "BedsoreLevel_new" USING ("level"::text::"BedsoreLevel_new");
ALTER TYPE "BedsoreLevel" RENAME TO "BedsoreLevel_old";
ALTER TYPE "BedsoreLevel_new" RENAME TO "BedsoreLevel";
DROP TYPE "BedsoreLevel_old";
COMMIT;
