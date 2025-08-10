-- CreateEnum
CREATE TYPE "public"."StatusEnum" AS ENUM ('ONGOING', 'COMPLETED', 'HIATUS', 'CANCELLED');

-- CreateEnum
CREATE TYPE "public"."ContentRatingEnum" AS ENUM ('SAFE', 'SUGGESTIVE', 'EROTICA', 'PORNOGRAPHIC');

-- CreateEnum
CREATE TYPE "public"."StateEnum" AS ENUM ('DRAFT', 'PUBLISHED', 'SUBMITTED', 'REJECTED');

-- CreateEnum
CREATE TYPE "public"."DemographicEnum" AS ENUM ('SHOUNEN', 'SHOUJO', 'SEINEN', 'JOSEI');

-- CreateTable
CREATE TABLE "public"."tb_mangas" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "alternative_titles" TEXT[],
    "description" TEXT,
    "original_language" TEXT NOT NULL,
    "publication_demographic" "public"."DemographicEnum",
    "status" "public"."StatusEnum" NOT NULL,
    "year" INTEGER,
    "content_rating" "public"."ContentRatingEnum" NOT NULL,
    "state" "public"."StateEnum" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tb_mangas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_mangas_title_key" ON "public"."tb_mangas"("title");
