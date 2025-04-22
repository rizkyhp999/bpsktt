-- CreateTable
CREATE TABLE `Karcis` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nomorKarcis` VARCHAR(191) NOT NULL,
    `platNomor` VARCHAR(191) NOT NULL,
    `fotoMotor` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
