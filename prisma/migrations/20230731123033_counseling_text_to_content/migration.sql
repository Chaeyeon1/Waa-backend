/*
  Warnings:

  - You are about to drop the column `text` on the `counseling` table. All the data in the column will be lost.
  - Added the required column `content` to the `Counseling` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `counseling` DROP COLUMN `text`,
    ADD COLUMN `content` VARCHAR(191) NOT NULL;
