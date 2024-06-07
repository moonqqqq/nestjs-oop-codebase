/*
  Warnings:

  - You are about to drop the `File` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "MachineLearningStatus" AS ENUM ('NOT_STARTED', 'IN_PROGRESS', 'COMPLETED', 'FAILED');

-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_diagnosisId_fkey";

-- AlterTable
ALTER TABLE "Diagnosis" ADD COLUMN     "machineLearningStatus" "MachineLearningStatus" NOT NULL DEFAULT 'NOT_STARTED';

-- DropTable
DROP TABLE "File";

-- CreateTable
CREATE TABLE "InputFile" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "diagnosisId" TEXT,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InputFile_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "InputFile" ADD CONSTRAINT "InputFile_diagnosisId_fkey" FOREIGN KEY ("diagnosisId") REFERENCES "Diagnosis"("id") ON DELETE SET NULL ON UPDATE CASCADE;
