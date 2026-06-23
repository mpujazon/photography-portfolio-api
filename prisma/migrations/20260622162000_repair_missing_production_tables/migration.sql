-- Repair production databases whose migration history is marked as applied
-- while one or more application tables are missing.

-- CreateEnum
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'AlbumLayoutType') THEN
    CREATE TYPE "AlbumLayoutType" AS ENUM ('GRID', 'MASONRY', 'CAROUSEL');
  END IF;
END $$;

-- CreateTable
CREATE TABLE IF NOT EXISTS "Album" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "orderIndex" INTEGER NOT NULL DEFAULT 0,
    "coverPhotoUrl" TEXT,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Album_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "Photo" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "cameraSettings" JSONB,
    "albumId" UUID,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Photo_pkey" PRIMARY KEY ("id")
);

-- Repair Album shape.
ALTER TABLE "Album" ADD COLUMN IF NOT EXISTS "subtitle" TEXT;
UPDATE "Album" SET "subtitle" = '' WHERE "subtitle" IS NULL;
ALTER TABLE "Album" ALTER COLUMN "subtitle" SET NOT NULL;

ALTER TABLE "Album" ADD COLUMN IF NOT EXISTS "orderIndex" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "Album" ADD COLUMN IF NOT EXISTS "coverPhotoUrl" TEXT;
ALTER TABLE "Album" ADD COLUMN IF NOT EXISTS "isPublished" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "Album" ADD COLUMN IF NOT EXISTS "isFeatured" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "Album" ADD COLUMN IF NOT EXISTS "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "Album" ADD COLUMN IF NOT EXISTS "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE "Album" DROP COLUMN IF EXISTS "layoutType";
ALTER TABLE "Album" DROP COLUMN IF EXISTS "coverPhotoId";

-- Repair Photo shape.
ALTER TABLE "Photo" ADD COLUMN IF NOT EXISTS "url" TEXT;
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'Photo' AND column_name = 'imageUrl'
  ) THEN
    UPDATE "Photo" SET "url" = COALESCE("url", "imageUrl", '') WHERE "url" IS NULL;
  END IF;
END $$;
ALTER TABLE "Photo" ALTER COLUMN "url" SET NOT NULL;

ALTER TABLE "Photo" ADD COLUMN IF NOT EXISTS "category" TEXT;
UPDATE "Photo" SET "category" = '' WHERE "category" IS NULL;
ALTER TABLE "Photo" ALTER COLUMN "category" SET NOT NULL;

ALTER TABLE "Photo" ADD COLUMN IF NOT EXISTS "description" TEXT;
ALTER TABLE "Photo" ADD COLUMN IF NOT EXISTS "isFeatured" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "Photo" ADD COLUMN IF NOT EXISTS "cameraSettings" JSONB;
ALTER TABLE "Photo" ADD COLUMN IF NOT EXISTS "albumId" UUID;
ALTER TABLE "Photo" ADD COLUMN IF NOT EXISTS "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "Photo" ADD COLUMN IF NOT EXISTS "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE "Photo" DROP COLUMN IF EXISTS "imageUrl";

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "Album_slug_key" ON "Album"("slug");
CREATE UNIQUE INDEX IF NOT EXISTS "Photo_url_key" ON "Photo"("url");

-- AddForeignKey
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'Photo_albumId_fkey'
  ) THEN
    ALTER TABLE "Photo" ADD CONSTRAINT "Photo_albumId_fkey"
      FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE SET NULL ON UPDATE CASCADE;
  END IF;
END $$;

-- DropEnum
DROP TYPE IF EXISTS "AlbumLayoutType";
