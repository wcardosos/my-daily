-- DropForeignKey
ALTER TABLE "dailies" DROP CONSTRAINT "dailies_user_id_fkey";

-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_daily_id_fkey";

-- AddForeignKey
ALTER TABLE "dailies" ADD CONSTRAINT "dailies_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_daily_id_fkey" FOREIGN KEY ("daily_id") REFERENCES "dailies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
