/*
  Warnings:

  - You are about to drop the column `tokend_id` on the `Liquidity` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Liquidity` DROP COLUMN `tokend_id`,
    ADD COLUMN `token_id` INTEGER NULL;
