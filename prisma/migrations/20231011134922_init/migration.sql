/*
  Warnings:

  - You are about to drop the column `cover_letter` on the `applications` table. All the data in the column will be lost.
  - You are about to drop the column `date_applied` on the `applications` table. All the data in the column will be lost.
  - You are about to drop the column `date_closed` on the `jobs` table. All the data in the column will be lost.
  - You are about to drop the column `date_posted` on the `jobs` table. All the data in the column will be lost.
  - You are about to drop the column `linked_accounts` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `preferred_job` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `profile_picture` on the `users` table. All the data in the column will be lost.
  - Added the required column `dateApplied` to the `applications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `datePosted` to the `jobs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `applications` DROP COLUMN `cover_letter`,
    DROP COLUMN `date_applied`,
    ADD COLUMN `coverLetter` VARCHAR(191) NULL,
    ADD COLUMN `dateApplied` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `jobs` DROP COLUMN `date_closed`,
    DROP COLUMN `date_posted`,
    ADD COLUMN `dateClosed` DATETIME(3) NULL,
    ADD COLUMN `datePosted` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `linked_accounts`,
    DROP COLUMN `preferred_job`,
    DROP COLUMN `profile_picture`,
    ADD COLUMN `linkedAccounts` VARCHAR(191) NULL,
    ADD COLUMN `preferredJob` VARCHAR(191) NULL,
    ADD COLUMN `profilePicture` VARCHAR(191) NULL,
    MODIFY `gender` ENUM('Male', 'Female') NULL;
