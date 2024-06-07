/*
  Warnings:

  - You are about to drop the column `userId` on the `File` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('UNDERMINING', 'SINUS_TRACK', 'ETC');

-- CreateEnum
CREATE TYPE "BasalTissue" AS ENUM ('HEALED', 'EPITHELIALIZATION', 'GRANULATION_TISSUE', 'PARALYSIS_TISSUE', 'NECROTIC_TISSUE');

-- CreateEnum
CREATE TYPE "SurroundingSkin" AS ENUM ('NORMAL_SKIN', 'MARCERATION', 'ERYTHEMA', 'HARDENING', 'ETC');

-- CreateEnum
CREATE TYPE "AmountOfExudate" AS ENUM ('NONE', 'LITTLE', 'NORMAL_SKIN', 'MANY');

-- CreateEnum
CREATE TYPE "Region" AS ENUM ('SACRUM', 'HEEL', 'ISCHIAL_TUBEROSITY', 'SHIN_BONE', 'KNEECAP');

-- CreateEnum
CREATE TYPE "BedsoreLevel" AS ENUM ('ONE', 'TWO', 'THREE', 'FOUR', 'UNCLASSIFIED', 'DEEP_TISSUE_DAMAGE', 'CURE', 'NOT_BEDSORES', 'ETC');

-- CreateEnum
CREATE TYPE "Cause" AS ENUM ('MUCOUS_MEMBRANE', 'MEDICAL_DEVICE', 'OTHER');

-- AlterTable
ALTER TABLE "File" DROP COLUMN "userId",
ADD COLUMN     "diagnosisId" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "Patient" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "birthDate" TEXT NOT NULL,
    "sex" "Sex" NOT NULL,
    "serialNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Diagnosis" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "cause" "Cause" NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Diagnosis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BedsoreRecord" (
    "id" TEXT NOT NULL,
    "recordedAt" TIMESTAMP(3) NOT NULL,
    "level" "BedsoreLevel",
    "levelEtcDetail" TEXT,
    "predictionAccuracy" INTEGER,
    "region" "Region",
    "witdh" INTEGER,
    "length" INTEGER,
    "depth" INTEGER,
    "status" "Status",
    "statusEtcDetail" TEXT,
    "diagnosisId" TEXT NOT NULL,
    "isInfected" BOOLEAN,
    "surroundingSkin" "SurroundingSkin",
    "amountOfExudate" "AmountOfExudate",
    "basalTissue" "BasalTissue",
    "customRecord" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BedsoreRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BedsoreManagementGuid" (
    "id" TEXT NOT NULL,
    "level" "BedsoreLevel" NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BedsoreManagementGuid_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BedsoreRecord_diagnosisId_key" ON "BedsoreRecord"("diagnosisId");

-- AddForeignKey
ALTER TABLE "Diagnosis" ADD CONSTRAINT "Diagnosis_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BedsoreRecord" ADD CONSTRAINT "BedsoreRecord_diagnosisId_fkey" FOREIGN KEY ("diagnosisId") REFERENCES "Diagnosis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_diagnosisId_fkey" FOREIGN KEY ("diagnosisId") REFERENCES "Diagnosis"("id") ON DELETE SET NULL ON UPDATE CASCADE;
