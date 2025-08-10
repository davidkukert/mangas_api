-- CreateTable
CREATE TABLE "public"."tb_chapters" (
    "id" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "title" TEXT,
    "volume" TEXT,
    "pages" INTEGER NOT NULL,
    "translated_language" TEXT NOT NULL,
    "manga_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tb_chapters_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_chapters_manga_id_number_key" ON "public"."tb_chapters"("manga_id", "number");

-- AddForeignKey
ALTER TABLE "public"."tb_chapters" ADD CONSTRAINT "tb_chapters_manga_id_fkey" FOREIGN KEY ("manga_id") REFERENCES "public"."tb_mangas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
