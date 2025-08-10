-- CreateTable
CREATE TABLE "public"."tb_authors" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "biography" TEXT,
    "social_links" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT,

    CONSTRAINT "tb_authors_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_authors_name_key" ON "public"."tb_authors"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tb_authors_user_id_key" ON "public"."tb_authors"("user_id");

-- AddForeignKey
ALTER TABLE "public"."tb_authors" ADD CONSTRAINT "tb_authors_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."tb_users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
