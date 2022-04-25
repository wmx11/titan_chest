-- CreateTable
CREATE TABLE `Stats` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `price` INTEGER NOT NULL,
    `marketCap` INTEGER NOT NULL,
    `holders` INTEGER NOT NULL,
    `pairPrice` INTEGER NOT NULL,
    `liquidity` INTEGER NOT NULL,
    `averageHoldings` INTEGER NOT NULL,
    `treasury` INTEGER NOT NULL,
    `rfv` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
