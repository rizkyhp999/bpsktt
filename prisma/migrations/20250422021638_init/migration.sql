-- CreateIndex
CREATE INDEX `Ticket_status_idx` ON `Ticket`(`status`);

-- CreateIndex
CREATE INDEX `Ticket_createdAt_idx` ON `Ticket`(`createdAt`);

-- CreateIndex
CREATE INDEX `Vehicle_plateNumber_idx` ON `Vehicle`(`plateNumber`);

-- CreateIndex
CREATE INDEX `Vehicle_checkIn_idx` ON `Vehicle`(`checkIn`);

-- CreateIndex
CREATE INDEX `Vehicle_checkOut_idx` ON `Vehicle`(`checkOut`);
