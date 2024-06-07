/*
  Warnings:

  - You are about to drop the column `diagnosisIdForETCEmage` on the `InputFile` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "InputFile" DROP CONSTRAINT "InputFile_diagnosisIdForETCEmage_fkey";

-- AlterTable
ALTER TABLE "InputFile" DROP COLUMN "diagnosisIdForETCEmage",
ADD COLUMN     "diagnosisIdForETCImage" TEXT;

-- AddForeignKey
ALTER TABLE "InputFile" ADD CONSTRAINT "InputFile_diagnosisIdForETCImage_fkey" FOREIGN KEY ("diagnosisIdForETCImage") REFERENCES "Diagnosis"("id") ON DELETE SET NULL ON UPDATE CASCADE;
