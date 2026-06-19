/*
  Warnings:

  - You are about to drop the column `layoutType` on the `Album` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Album" DROP COLUMN "layoutType",
ADD COLUMN     "isFeatured" BOOLEAN NOT NULL DEFAULT false;
