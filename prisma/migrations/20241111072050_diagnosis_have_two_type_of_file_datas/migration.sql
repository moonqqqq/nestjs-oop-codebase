/*
  Warnings:

  - You are about to drop the column `diagnosisId` on the `InputFile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[diagnosisIdForMainImage]` on the table `InputFile` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "InputFile" DROP CONSTRAINT "InputFile_diagnosisId_fkey";

-- AlterTable
ALTER TABLE "InputFile" DROP COLUMN "diagnosisId",
ADD COLUMN     "diagnosisIdForETCEmage" TEXT,
ADD COLUMN     "diagnosisIdForMainImage" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "InputFile_diagnosisIdForMainImage_key" ON "InputFile"("diagnosisIdForMainImage");

-- AddForeignKey
ALTER TABLE "InputFile" ADD CONSTRAINT "InputFile_diagnosisIdForMainImage_fkey" FOREIGN KEY ("diagnosisIdForMainImage") REFERENCES "Diagnosis"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InputFile" ADD CONSTRAINT "InputFile_diagnosisIdForETCEmage_fkey" FOREIGN KEY ("diagnosisIdForETCEmage") REFERENCES "Diagnosis"("id") ON DELETE SET NULL ON UPDATE CASCADE;
