-- CreateTable
CREATE TABLE `FrontMemo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL,
    `writer` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FrontMemoComment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `memoId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `FrontMemoComment` ADD CONSTRAINT `FrontMemoComment_memoId_fkey` FOREIGN KEY (`memoId`) REFERENCES `FrontMemo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
