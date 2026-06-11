-- CreateTable
CREATE TABLE "business_hours" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "day" INTEGER NOT NULL,
    "open_time" TEXT NOT NULL,
    "lunch_start" TEXT,
    "lunch_end" TEXT,
    "close_time" TEXT NOT NULL,
    "is_open" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "business_hours_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "business_hours_user_id_day_key" ON "business_hours"("user_id", "day");

-- AddForeignKey
ALTER TABLE "business_hours" ADD CONSTRAINT "business_hours_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
