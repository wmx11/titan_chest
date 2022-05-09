/*
  Warnings:

  - You are about to alter the column `bot_id` on the `Bots` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `Bots` MODIFY `bot_id` INTEGER NULL;
