-- CreateEnum
CREATE TYPE "AlbumLayoutType" AS ENUM ('GRID', 'MASONRY', 'CAROUSEL');

-- CreateTable
CREATE TABLE "Album" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "layoutType" "AlbumLayoutType" NOT NULL DEFAULT 'GRID',
    "orderIndex" INTEGER NOT NULL DEFAULT 0,
    "coverPhotoId" UUID,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Album_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Album_slug_key" ON "Album"("slug");
