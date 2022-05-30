-- AlterTable
ALTER TABLE `Project` ADD COLUMN `burn_address` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Stats` ADD COLUMN `burned_tokens` DOUBLE NULL;
