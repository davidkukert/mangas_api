-- CreateEnum
CREATE TYPE "public"."MangaAuthorRoleEnum" AS ENUM ('AUTHOR', 'ARTIST');

-- CreateEnum
CREATE TYPE "public"."FollowStatusEnum" AS ENUM ('READING', 'COMPLETED', 'ONHOLD', 'DROPPED', 'PLANTOREAD');

-- CreateTable
CREATE TABLE "public"."manga_authors" (
    "manga_id" TEXT NOT NULL,
    "author_id" TEXT NOT NULL,
    "role" "public"."MangaAuthorRoleEnum" NOT NULL,

    CONSTRAINT "manga_authors_pkey" PRIMARY KEY ("manga_id","author_id")
);

-- CreateTable
CREATE TABLE "public"."manga_followers" (
    "manga_id" TEXT NOT NULL,
    "follower_id" TEXT NOT NULL,
    "status" "public"."FollowStatusEnum" NOT NULL DEFAULT 'PLANTOREAD',

    CONSTRAINT "manga_followers_pkey" PRIMARY KEY ("manga_id","follower_id")
);

-- CreateTable
CREATE TABLE "public"."reading_history" (
    "chapter_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "reading_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "page" INTEGER,

    CONSTRAINT "reading_history_pkey" PRIMARY KEY ("chapter_id","user_id")
);

-- CreateTable
CREATE TABLE "public"."_tb_mangas_tags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_tb_mangas_tags_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_tb_mangas_tags_B_index" ON "public"."_tb_mangas_tags"("B");

-- AddForeignKey
ALTER TABLE "public"."manga_authors" ADD CONSTRAINT "manga_authors_manga_id_fkey" FOREIGN KEY ("manga_id") REFERENCES "public"."tb_mangas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."manga_authors" ADD CONSTRAINT "manga_authors_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "public"."tb_authors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."manga_followers" ADD CONSTRAINT "manga_followers_manga_id_fkey" FOREIGN KEY ("manga_id") REFERENCES "public"."tb_mangas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."manga_followers" ADD CONSTRAINT "manga_followers_follower_id_fkey" FOREIGN KEY ("follower_id") REFERENCES "public"."tb_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."reading_history" ADD CONSTRAINT "reading_history_chapter_id_fkey" FOREIGN KEY ("chapter_id") REFERENCES "public"."tb_chapters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."reading_history" ADD CONSTRAINT "reading_history_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."tb_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_tb_mangas_tags" ADD CONSTRAINT "_tb_mangas_tags_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."tb_mangas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_tb_mangas_tags" ADD CONSTRAINT "_tb_mangas_tags_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."tb_tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
