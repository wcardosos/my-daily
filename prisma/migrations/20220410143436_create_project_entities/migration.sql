-- CreateEnum
CREATE TYPE "AccountProvider" AS ENUM ('email', 'github', 'google');

-- CreateEnum
CREATE TYPE "TaskType" AS ENUM ('done', 'to_do', 'lock');

-- CreateTable
CREATE TABLE "users" (
    "email" TEXT NOT NULL,
    "provider" "AccountProvider" NOT NULL DEFAULT E'email',
    "name" TEXT NOT NULL,
    "password" TEXT,
    "picture_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "dailies" (
    "id" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "dailies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tasks" (
    "id" TEXT NOT NULL,
    "daily_id" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "type" "TaskType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "dailies" ADD CONSTRAINT "dailies_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_daily_id_fkey" FOREIGN KEY ("daily_id") REFERENCES "dailies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
