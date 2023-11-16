/*
  Warnings:

  - You are about to drop the column `firstName` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `users` table. All the data in the column will be lost.
  - Added the required column `fullname` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `firstName`,
    DROP COLUMN `lastName`,
    ADD COLUMN `certification` VARCHAR(191) NULL,
    ADD COLUMN `contact` VARCHAR(191) NULL,
    ADD COLUMN `cv` VARCHAR(191) NULL,
    ADD COLUMN `disability` ENUM('Blindness', 'Deafness') NULL,
    ADD COLUMN `education` VARCHAR(191) NULL,
    ADD COLUMN `experience` VARCHAR(191) NULL,
    ADD COLUMN `fullname` VARCHAR(191) NOT NULL,
    ADD COLUMN `gender` ENUM('Male', 'Female') NOT NULL,
    ADD COLUMN `linked_accounts` VARCHAR(191) NULL,
    ADD COLUMN `preferred_job` VARCHAR(191) NULL,
    ADD COLUMN `profile_picture` VARCHAR(191) NULL,
    ADD COLUMN `skills` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `applications` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `jobId` INTEGER NOT NULL,
    `status` ENUM('Pending', 'Failed', 'Success') NOT NULL,
    `cover_letter` VARCHAR(191) NULL,
    `date_applied` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `jobs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `type` ENUM('Fulltime', 'Contract', 'Internship', 'Parttime', 'Temporary', 'FreshGraduate', 'Subcontract') NOT NULL,
    `system` ENUM('Onsite', 'Remote') NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `salary` INTEGER NULL,
    `requirement` TEXT NULL,
    `date_posted` DATETIME(3) NOT NULL,
    `date_closed` DATETIME(3) NULL,
    `jobcategoryId` INTEGER NOT NULL,
    `companyId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `job_categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `companies` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `logo` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `location` VARCHAR(191) NULL,
    `industry` VARCHAR(191) NULL,
    `links` VARCHAR(191) NULL,
    `contact` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
