/*
  Warnings:

  - Added the required column `userName` to the `DrawingGame` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userName` to the `MemoryGame` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `DrawingGame` ADD COLUMN `userName` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `MemoryGame` ADD COLUMN `userName` VARCHAR(191) NOT NULL;
