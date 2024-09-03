START TRANSACTION;
  DROP TABLE IF EXISTS `Transaction`;
  CREATE TABLE IF NOT EXISTS `Transaction` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `externalId` CHAR(36) UNIQUE,
    `accountExternalIdDebit` CHAR(36) NOT NULL,
    `accountExternalIdCredit` CHAR(36) NOT NULL,
    `tranferTypeId` INT NOT NULL,
    `transactionStatusId` INT NOT NULL,
    `transactionValue` DECIMAL(10, 2) NOT NULL,
    `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
 COMMIT