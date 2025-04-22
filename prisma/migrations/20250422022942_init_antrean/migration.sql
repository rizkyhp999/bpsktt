/*
  Warnings:

  - You are about to drop the `ticket` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `vehicle` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `vehicle` DROP FOREIGN KEY `Vehicle_ticketId_fkey`;

-- DropTable
DROP TABLE `ticket`;

-- DropTable
DROP TABLE `vehicle`;

-- CreateTable
CREATE TABLE `Antrean` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nomor` INTEGER NOT NULL,
    `layanan` VARCHAR(191) NOT NULL,
    `tanggal` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` VARCHAR(191) NOT NULL DEFAULT 'MENUNGGU',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
