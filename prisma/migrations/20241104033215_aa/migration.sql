/*
  Warnings:

  - You are about to drop the column `bedsoreRecordId` on the `Diagnosis` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[diagnosisId]` on the table `BedsoreRecord` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Diagnosis" DROP CONSTRAINT "Diagnosis_bedsoreRecordId_fkey";

-- DropIndex
DROP INDEX "Diagnosis_bedsoreRecordId_key";

-- AlterTable
ALTER TABLE "BedsoreRecord" ADD COLUMN     "diagnosisId" TEXT;

-- AlterTable
ALTER TABLE "Diagnosis" DROP COLUMN "bedsoreRecordId";

-- CreateIndex
CREATE UNIQUE INDEX "BedsoreRecord_diagnosisId_key" ON "BedsoreRecord"("diagnosisId");

-- AddForeignKey
ALTER TABLE "BedsoreRecord" ADD CONSTRAINT "BedsoreRecord_diagnosisId_fkey" FOREIGN KEY ("diagnosisId") REFERENCES "Diagnosis"("id") ON DELETE SET NULL ON UPDATE CASCADE;
