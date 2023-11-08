/*
  Warnings:

  - You are about to drop the column `disability` on the `users` table. All the data in the column will be lost.
  - Added the required column `disabilityId` to the `jobs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `jobs` ADD COLUMN `disabilityId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `disability`,
    ADD COLUMN `disabilityId` INTEGER NULL;

-- CreateTable
CREATE TABLE `disability` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_disabilityId_fkey` FOREIGN KEY (`disabilityId`) REFERENCES `disability`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `jobs` ADD CONSTRAINT `jobs_disabilityId_fkey` FOREIGN KEY (`disabilityId`) REFERENCES `disability`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
