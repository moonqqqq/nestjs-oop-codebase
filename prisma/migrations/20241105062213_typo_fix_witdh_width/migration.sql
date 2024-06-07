/*
  Warnings:

  - You are about to drop the column `witdh` on the `BedsoreRecord` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BedsoreRecord" DROP COLUMN "witdh",
ADD COLUMN     "width" INTEGER;
