/*
  Warnings:

  - The values [Failed,Success] on the enum `applications_status` will be removed. If these variants are still used in the database, this will fail.
  - The values [Blindness] on the enum `users_disability` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `applications` MODIFY `status` ENUM('Pending', 'OnReview', 'Accepted', 'Rejected', 'Withdrawn', 'Hired', 'Expired') NOT NULL;

-- AlterTable
ALTER TABLE `jobs` MODIFY `system` ENUM('Onsite', 'Remote', 'Hybrid') NOT NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `disability` ENUM('ColorBlindness', 'PartialBlindness', 'FullBlindness', 'Dyslexia', 'HearingLoss', 'Deafness', 'PhysicalImpairment') NULL;

-- AddForeignKey
ALTER TABLE `applications` ADD CONSTRAINT `applications_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `applications` ADD CONSTRAINT `applications_jobId_fkey` FOREIGN KEY (`jobId`) REFERENCES `jobs`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `jobs` ADD CONSTRAINT `jobs_jobcategoryId_fkey` FOREIGN KEY (`jobcategoryId`) REFERENCES `job_categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `jobs` ADD CONSTRAINT `jobs_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `companies`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
