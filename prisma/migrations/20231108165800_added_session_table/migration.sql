-- DropForeignKey
ALTER TABLE `jobs` DROP FOREIGN KEY `jobs_disabilityId_fkey`;

-- AlterTable
ALTER TABLE `jobs` MODIFY `disabilityId` INTEGER NULL;

-- CreateTable
CREATE TABLE `Session` (
    `id` VARCHAR(191) NOT NULL,
    `sid` VARCHAR(191) NOT NULL,
    `data` MEDIUMTEXT NOT NULL,
    `expiresAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Session_sid_key`(`sid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `jobs` ADD CONSTRAINT `jobs_disabilityId_fkey` FOREIGN KEY (`disabilityId`) REFERENCES `disability`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
