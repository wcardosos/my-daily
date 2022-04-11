/*
  Warnings:

  - The primary key for the `dailies` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_daily_id_fkey";

-- AlterTable
ALTER TABLE "dailies" DROP CONSTRAINT "dailies_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "dailies_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "tasks" ALTER COLUMN "daily_id" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_daily_id_fkey" FOREIGN KEY ("daily_id") REFERENCES "dailies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
