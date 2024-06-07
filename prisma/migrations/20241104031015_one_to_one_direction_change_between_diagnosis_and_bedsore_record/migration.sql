/*
  Warnings:

  - You are about to drop the column `diagnosisId` on the `BedsoreRecord` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[bedsoreRecordId]` on the table `Diagnosis` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "BedsoreRecord" DROP CONSTRAINT "BedsoreRecord_diagnosisId_fkey";

-- DropIndex
DROP INDEX "BedsoreRecord_diagnosisId_key";

-- AlterTable
ALTER TABLE "BedsoreRecord" DROP COLUMN "diagnosisId";

-- AlterTable
ALTER TABLE "Diagnosis" ADD COLUMN     "bedsoreRecordId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Diagnosis_bedsoreRecordId_key" ON "Diagnosis"("bedsoreRecordId");

-- AddForeignKey
ALTER TABLE "Diagnosis" ADD CONSTRAINT "Diagnosis_bedsoreRecordId_fkey" FOREIGN KEY ("bedsoreRecordId") REFERENCES "BedsoreRecord"("id") ON DELETE SET NULL ON UPDATE CASCADE;
