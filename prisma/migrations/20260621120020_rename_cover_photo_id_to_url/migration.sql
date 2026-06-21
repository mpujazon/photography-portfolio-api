/*
  Warnings:

  - You are about to drop the column `coverPhotoId` on the `Album` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Album" DROP COLUMN "coverPhotoId",
ADD COLUMN     "coverPhotoUrl" TEXT;
