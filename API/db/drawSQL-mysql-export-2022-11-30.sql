CREATE TABLE `Users`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `role` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `Adresse` VARCHAR(255) NOT NULL
);

CREATE TABLE `Products`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `price` DOUBLE(8, 2) NOT NULL,
    `UserId` INT UNSIGNED NOT NULL
);

ALTER TABLE
    `Products` ADD CONSTRAINT `products_userid_foreign` FOREIGN KEY(`UserId`) REFERENCES `Users`(`id`);
    
    
