/*
  Warnings:

  - You are about to drop the `File` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "File";

-- CreateTable
CREATE TABLE "InputFile" (
    "id" TEXT NOT NULL,
    "formattedName" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InputFile_pkey" PRIMARY KEY ("id")
);
