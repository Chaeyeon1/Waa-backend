/*
  Warnings:

  - You are about to drop the column `user_id` on the `Quiz` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Quiz` DROP FOREIGN KEY `Quiz_user_id_fkey`;

-- AlterTable
ALTER TABLE `Quiz` DROP COLUMN `user_id`,
    ADD COLUMN `userId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Quiz` ADD CONSTRAINT `Quiz_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
