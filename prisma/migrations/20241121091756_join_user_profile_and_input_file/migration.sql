/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `InputFile` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "InputFile" ADD COLUMN     "userId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "InputFile_userId_key" ON "InputFile"("userId");

-- AddForeignKey
ALTER TABLE "InputFile" ADD CONSTRAINT "InputFile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
