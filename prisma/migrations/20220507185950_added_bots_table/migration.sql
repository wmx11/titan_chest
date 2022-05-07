-- CreateTable
CREATE TABLE `Bots` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `presence` VARCHAR(191) NOT NULL,
    `tracking` VARCHAR(191) NULL,
    `token` VARCHAR(191) NULL,
    `project_id` INTEGER NULL,
    `enabled` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
