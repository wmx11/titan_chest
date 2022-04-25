/*
  Warnings:

  - You are about to drop the column `averageHoldings` on the `Stats` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Stats` table. All the data in the column will be lost.
  - You are about to drop the column `marketCap` on the `Stats` table. All the data in the column will be lost.
  - You are about to drop the column `pairPrice` on the `Stats` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Stats` DROP COLUMN `averageHoldings`,
    DROP COLUMN `createdAt`,
    DROP COLUMN `marketCap`,
    DROP COLUMN `pairPrice`,
    ADD COLUMN `average_holdings` DOUBLE NULL,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `marketcap` DOUBLE NULL,
    ADD COLUMN `pair_price` DOUBLE NULL,
    ADD COLUMN `project_id` INTEGER NULL,
    MODIFY `price` DOUBLE NULL,
    MODIFY `holders` DOUBLE NULL,
    MODIFY `liquidity` DOUBLE NULL,
    MODIFY `treasury` DOUBLE NULL,
    MODIFY `rfv` DOUBLE NULL;

-- CreateTable
CREATE TABLE `Project` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NULL,
    `abi_id` INTEGER NULL,
    `token_id` INTEGER NULL,
    `enabled` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ABI` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `abi` JSON NOT NULL,
    `token_id` INTEGER NULL,
    `project_id` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Token` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NULL,
    `abi_id` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Liquidity` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NULL,
    `tokend_id` INTEGER NULL,
    `project_id` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
