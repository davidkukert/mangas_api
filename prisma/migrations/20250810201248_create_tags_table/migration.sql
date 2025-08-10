-- CreateEnum
CREATE TYPE "public"."TagGroupEnum" AS ENUM ('GENRE', 'THEME', 'FORMAT', 'CONTENT');

-- CreateTable
CREATE TABLE "public"."tb_tags" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "group" "public"."TagGroupEnum" NOT NULL,

    CONSTRAINT "tb_tags_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_tags_name_key" ON "public"."tb_tags"("name");
