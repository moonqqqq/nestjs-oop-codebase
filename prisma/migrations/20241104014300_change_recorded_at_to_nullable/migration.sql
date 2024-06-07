/*
  Warnings:

  - The `status` column on the `BedsoreRecord` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "BedsoreRecordStatus" AS ENUM ('UNDERMINING', 'SINUS_TRACK', 'ETC');

-- DropForeignKey
ALTER TABLE "BedsoreRecord" DROP CONSTRAINT "BedsoreRecord_diagnosisId_fkey";

-- AlterTable
ALTER TABLE "BedsoreRecord" ALTER COLUMN "recordedAt" DROP NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "BedsoreRecordStatus",
ALTER COLUMN "diagnosisId" DROP NOT NULL,
ALTER COLUMN "customRecord" DROP NOT NULL;

-- DropEnum
DROP TYPE "Status";

-- AddForeignKey
ALTER TABLE "BedsoreRecord" ADD CONSTRAINT "BedsoreRecord_diagnosisId_fkey" FOREIGN KEY ("diagnosisId") REFERENCES "Diagnosis"("id") ON DELETE SET NULL ON UPDATE CASCADE;
