/*
  Warnings:

  - Added the required column `userId` to the `KeywordCount` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `KeywordCount` ADD COLUMN `userId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `KeywordCount` ADD CONSTRAINT `KeywordCount_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
