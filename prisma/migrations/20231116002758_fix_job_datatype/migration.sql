-- DropForeignKey
ALTER TABLE `jobs` DROP FOREIGN KEY `jobs_disabilityId_fkey`;

-- AlterTable
ALTER TABLE `jobs` MODIFY `disabilityId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `jobs` ADD CONSTRAINT `jobs_disabilityId_fkey` FOREIGN KEY (`disabilityId`) REFERENCES `disability`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
