/*
  Warnings:

  - Added the required column `date` to the `dailies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "dailies" ADD COLUMN     "date" TEXT NOT NULL;
