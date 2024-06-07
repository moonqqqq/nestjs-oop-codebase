/*
  Warnings:

  - You are about to drop the `BedsoreManagementGuid` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "BedsoreManagementGuid";

-- DropTable
DROP TABLE "Image";

-- CreateTable
CREATE TABLE "BedsoreManagementGuide" (
    "id" TEXT NOT NULL,
    "level" "BedsoreLevel" NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BedsoreManagementGuide_pkey" PRIMARY KEY ("id")
);
