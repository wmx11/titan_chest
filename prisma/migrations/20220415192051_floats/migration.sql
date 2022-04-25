/*
  Warnings:

  - You are about to alter the column `price` on the `Stats` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `marketCap` on the `Stats` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `holders` on the `Stats` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `pairPrice` on the `Stats` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `liquidity` on the `Stats` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `averageHoldings` on the `Stats` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `treasury` on the `Stats` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `rfv` on the `Stats` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `Stats` MODIFY `price` DOUBLE NOT NULL,
    MODIFY `marketCap` DOUBLE NOT NULL,
    MODIFY `holders` DOUBLE NOT NULL,
    MODIFY `pairPrice` DOUBLE NOT NULL,
    MODIFY `liquidity` DOUBLE NOT NULL,
    MODIFY `averageHoldings` DOUBLE NOT NULL,
    MODIFY `treasury` DOUBLE NOT NULL,
    MODIFY `rfv` DOUBLE NOT NULL;
