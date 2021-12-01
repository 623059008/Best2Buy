/*
 Navicat Premium Data Transfer

 Source Server         : cat
 Source Server Type    : MySQL
 Source Server Version : 80027
 Source Host           : localhost:3306
 Source Schema         : e_commerce

 Target Server Type    : MySQL
 Target Server Version : 80027
 File Encoding         : 65001

 Date: 30/11/2021 12:21:17
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for businesscustomer
-- ----------------------------
DROP TABLE IF EXISTS `businesscustomer`;
CREATE TABLE `businesscustomer`  (
  `CustomerID` int(0) NOT NULL,
  `Name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `BusinessCategory` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `GrossAnnualIncome` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`CustomerID`, `Name`) USING BTREE,
  UNIQUE INDEX `Name`(`Name`) USING BTREE,
  INDEX `ID`(`CustomerID`) USING BTREE,
  CONSTRAINT `businesscustomer_ibfk_1` FOREIGN KEY (`CustomerID`) REFERENCES `customers` (`CustomerID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `businesscustomer_ibfk_2` FOREIGN KEY (`Name`) REFERENCES `customers` (`Name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of businesscustomer
-- ----------------------------
INSERT INTO `businesscustomer` VALUES (1, 'Aaron', 'Trading', '200000');
INSERT INTO `businesscustomer` VALUES (3, 'Dallas', 'Trading', '500000');
INSERT INTO `businesscustomer` VALUES (5, 'Gail', 'Trading', '300000');
INSERT INTO `businesscustomer` VALUES (7, 'Campbell	\r\nCampbell	\r\nCampbell', 'Manufacturing', '600000');
INSERT INTO `businesscustomer` VALUES (9, 'Lacey', 'Manufacturing', '1000000');
INSERT INTO `businesscustomer` VALUES (11, 'Madonna', 'Manufacturing', '111000');
INSERT INTO `businesscustomer` VALUES (13, 'Oliver', 'Manufacturing', '302000');
INSERT INTO `businesscustomer` VALUES (15, 'Ramsey', 'Manufacturing', '403000');
INSERT INTO `businesscustomer` VALUES (17, 'Catherina', 'Trading', '500030');
INSERT INTO `businesscustomer` VALUES (19, 'Chamberlain', 'Trading', '390000');

-- ----------------------------
-- Table structure for customers
-- ----------------------------
DROP TABLE IF EXISTS `customers`;
CREATE TABLE `customers`  (
  `CustomerID` int(0) NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Street` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `City` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `State` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `ZipCode` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `Kind` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Tel` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`CustomerID`, `Tel`, `Email`) USING BTREE,
  UNIQUE INDEX `CustomerID`(`CustomerID`) USING BTREE,
  INDEX `Name`(`Name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 22 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of customers
-- ----------------------------
INSERT INTO `customers` VALUES (1, 'Aaron', '208 N Craig St', 'Pittsburgh', 'PA', '15213', 'Business', '81dc9bdb52d04dc20036dbd8313ed055', '4122223333', 'aaron@tmpbox.net');
INSERT INTO `customers` VALUES (2, 'Dale', '422 Noble St', 'Pittsburgh', 'PA', '15232', 'Home', '81dc9bdb52d04dc20036dbd8313ed055', '4126667777', 'dale@tmpbox.net ');
INSERT INTO `customers` VALUES (3, 'Dallas', '147 Julius St', 'Pittsburgh', 'PA', '15206', 'Business', '81dc9bdb52d04dc20036dbd8313ed055', '4121111111', 'dallas@tmpbox.net');
INSERT INTO `customers` VALUES (4, 'Damian', '6411 Deary St', 'Pittsburgh', 'PA', '15206', 'Home', '81dc9bdb52d04dc20036dbd8313ed055', '4123334444', 'damian@tmpbox.net');
INSERT INTO `customers` VALUES (5, 'Gail', '925 Woodbine St', 'Pitssburgh', 'PA', '15201', 'Business', '', '4125556666', 'gail@tmpbox.net');
INSERT INTO `customers` VALUES (6, 'Garfield', '5442 Wakefield St', 'Philadelphia', 'PA', '19144', 'Home', '', '2151111111', 'garfield@tmpbox.net');
INSERT INTO `customers` VALUES (7, 'Campbell	\r\nCampbell	\r\nCampbell', '5604 Baynton St', 'Philadelphia', 'PA', '19144', 'Business', '', '2152222222', 'campbell@tmpbox.net');
INSERT INTO `customers` VALUES (8, 'Camilla', '5390 Magnolia St', 'Philadelphia', 'PA', '19144', 'Home', '', '2153333333', 'camilla@tmpbox.net');
INSERT INTO `customers` VALUES (9, 'Lacey', '5750 Virginian Rd', 'Philadelphia', 'PA', '19141', 'Business', '', '2154444444', 'lacey@tmpbox.net');
INSERT INTO `customers` VALUES (10, 'Madeline', '6047 N 13th St', 'Philadelphia', 'PA', '19141', 'Home', '', '2155555555', 'madeline@tmpbox.net');
INSERT INTO `customers` VALUES (11, 'Madonna', '219 E 30th St', 'NYC', 'NY', '10016', 'Business', '', '2121111111', 'madonna@tmpbox.net');
INSERT INTO `customers` VALUES (12, 'Mae', '16 E 65th St', 'NYC', 'NY', '10065', 'Home', '', '2122222222', 'mae@tmpbox.net');
INSERT INTO `customers` VALUES (13, 'Oliver', '216 E 83rd St', 'NYC', 'NY', '10028', 'Business', '', '2123333333', 'oliver@tmpbox.net');
INSERT INTO `customers` VALUES (14, 'Rachel', '429 E 84th St', 'NYC', 'NY', '10028', 'Home', '', '2124444444', 'rachel@tmpbox.net');
INSERT INTO `customers` VALUES (15, 'Ramsey', '34 Prince St', 'Boston', 'MA', '02113', 'Business', '', '6171111111', 'ramsey@tmpbox.net');
INSERT INTO `customers` VALUES (16, 'Randall', '101 Beverly St', 'Boston', 'MA', '02114', 'Home', '', '6172222222', 'randall@tmpbox.net');
INSERT INTO `customers` VALUES (17, 'Catherina', '8 Pinckney St', 'Boston', 'MA', '02108', 'Business', '', '6173333333', 'catherina@tmpbox.net');
INSERT INTO `customers` VALUES (18, 'Cecil', '37 Halstead St', 'Newark', 'NJ', '07106', 'Home', '', '8621111111', 'cecil@tmpbox.net');
INSERT INTO `customers` VALUES (19, 'Chamberlain', '332 Grove St', 'Newark', 'NJ', '07103', 'Business', '81dc9bdb52d04dc20036dbd8313ed055', '8622222222', 'chamberlain@tmpbox.net');
INSERT INTO `customers` VALUES (20, 'Chambers', '191 S 10th St', 'Newark', 'NJ', '07107', 'Home', '81dc9bdb52d04dc20036dbd8313ed055', '8623333333', 'chambers@tmpbox.net');
INSERT INTO `customers` VALUES (21, 'Rua', '446 Natchez St', 'Pitssburgh', 'PA', '15211', 'Administrator', '81dc9bdb52d04dc20036dbd8313ed055', '4120000000', 'rua@tmpbox.net');

-- ----------------------------
-- Table structure for homecustomer
-- ----------------------------
DROP TABLE IF EXISTS `homecustomer`;
CREATE TABLE `homecustomer`  (
  `CustomerID` int(0) NOT NULL,
  `Name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Gender` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Age` int(0) NOT NULL,
  `MarriageStatus` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Income` int(0) NULL DEFAULT NULL,
  PRIMARY KEY (`CustomerID`, `Name`) USING BTREE,
  UNIQUE INDEX `Name`(`Name`) USING BTREE,
  INDEX `ID`(`CustomerID`) USING BTREE,
  CONSTRAINT `homecustomer_ibfk_1` FOREIGN KEY (`CustomerID`) REFERENCES `customers` (`CustomerID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `homecustomer_ibfk_2` FOREIGN KEY (`Name`) REFERENCES `customers` (`Name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of homecustomer
-- ----------------------------
INSERT INTO `homecustomer` VALUES (2, 'Dale', 'M', 23, 'Single', 3000);
INSERT INTO `homecustomer` VALUES (4, 'Damian', 'M', 54, 'Married', 2000);
INSERT INTO `homecustomer` VALUES (6, 'Garfield', 'M', 33, 'Single', 5000);
INSERT INTO `homecustomer` VALUES (8, 'Camilla', 'F', 23, 'Single', 3000);
INSERT INTO `homecustomer` VALUES (10, 'Madeline', 'F', 37, 'Single', 2000);
INSERT INTO `homecustomer` VALUES (12, 'Mae', 'F', 74, 'Married', 7000);
INSERT INTO `homecustomer` VALUES (14, 'Rachel', 'F', 10, 'Single', 0);
INSERT INTO `homecustomer` VALUES (16, 'Randall', 'M', 30, 'Single', 4000);
INSERT INTO `homecustomer` VALUES (18, 'Cecil', 'M', 20, 'Single', 900);
INSERT INTO `homecustomer` VALUES (20, 'Chambers', 'F', 25, 'Married', 6000);

-- ----------------------------
-- Table structure for inventory
-- ----------------------------
DROP TABLE IF EXISTS `inventory`;
CREATE TABLE `inventory`  (
  `StoreID` int(0) NOT NULL,
  `ProductID` int(0) NOT NULL,
  `NumberOfProduct` int(0) NULL DEFAULT NULL,
  PRIMARY KEY (`StoreID`, `ProductID`) USING BTREE,
  INDEX `StoreID`(`StoreID`) USING BTREE,
  INDEX `ProductID`(`ProductID`) USING BTREE,
  CONSTRAINT `inventory_ibfk_1` FOREIGN KEY (`StoreID`) REFERENCES `store` (`StoreID`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `inventory_ibfk_2` FOREIGN KEY (`ProductID`) REFERENCES `products` (`ProductID`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of inventory
-- ----------------------------
INSERT INTO `inventory` VALUES (1, 1, 30);
INSERT INTO `inventory` VALUES (1, 2, 5);
INSERT INTO `inventory` VALUES (1, 6, 50);
INSERT INTO `inventory` VALUES (1, 8, 150);
INSERT INTO `inventory` VALUES (1, 9, 5);
INSERT INTO `inventory` VALUES (1, 10, 30);
INSERT INTO `inventory` VALUES (1, 13, 2);
INSERT INTO `inventory` VALUES (1, 15, 3);
INSERT INTO `inventory` VALUES (1, 17, 2);
INSERT INTO `inventory` VALUES (1, 21, 1);
INSERT INTO `inventory` VALUES (1, 23, 10);
INSERT INTO `inventory` VALUES (1, 25, 100);
INSERT INTO `inventory` VALUES (1, 26, 200);
INSERT INTO `inventory` VALUES (2, 1, 50);
INSERT INTO `inventory` VALUES (2, 2, 4);
INSERT INTO `inventory` VALUES (2, 5, 100);
INSERT INTO `inventory` VALUES (2, 6, 150);
INSERT INTO `inventory` VALUES (2, 8, 100);
INSERT INTO `inventory` VALUES (2, 10, 70);
INSERT INTO `inventory` VALUES (2, 11, 11);
INSERT INTO `inventory` VALUES (2, 12, 1);
INSERT INTO `inventory` VALUES (2, 14, 3);
INSERT INTO `inventory` VALUES (2, 15, 3);
INSERT INTO `inventory` VALUES (2, 18, 3);
INSERT INTO `inventory` VALUES (2, 22, 2);
INSERT INTO `inventory` VALUES (2, 24, 100);
INSERT INTO `inventory` VALUES (2, 25, 300);
INSERT INTO `inventory` VALUES (2, 26, 200);
INSERT INTO `inventory` VALUES (2, 27, 1000);
INSERT INTO `inventory` VALUES (3, 1, 50);
INSERT INTO `inventory` VALUES (3, 2, 1);
INSERT INTO `inventory` VALUES (3, 3, 20);
INSERT INTO `inventory` VALUES (3, 5, 200);
INSERT INTO `inventory` VALUES (3, 7, 300);
INSERT INTO `inventory` VALUES (3, 9, 20);
INSERT INTO `inventory` VALUES (3, 10, 100);
INSERT INTO `inventory` VALUES (3, 12, 1);
INSERT INTO `inventory` VALUES (3, 16, 3);
INSERT INTO `inventory` VALUES (3, 22, 3);
INSERT INTO `inventory` VALUES (3, 23, 20);
INSERT INTO `inventory` VALUES (3, 24, 200);
INSERT INTO `inventory` VALUES (3, 25, 50);
INSERT INTO `inventory` VALUES (3, 26, 200);
INSERT INTO `inventory` VALUES (3, 27, 2000);
INSERT INTO `inventory` VALUES (4, 1, 30);
INSERT INTO `inventory` VALUES (4, 4, 11);
INSERT INTO `inventory` VALUES (4, 5, 100);
INSERT INTO `inventory` VALUES (4, 6, 100);
INSERT INTO `inventory` VALUES (4, 8, 150);
INSERT INTO `inventory` VALUES (4, 11, 9);
INSERT INTO `inventory` VALUES (4, 13, 3);
INSERT INTO `inventory` VALUES (4, 14, 2);
INSERT INTO `inventory` VALUES (4, 19, 5);
INSERT INTO `inventory` VALUES (4, 25, 100);
INSERT INTO `inventory` VALUES (4, 26, 200);
INSERT INTO `inventory` VALUES (4, 28, 1500);
INSERT INTO `inventory` VALUES (5, 1, 40);
INSERT INTO `inventory` VALUES (5, 4, 11);
INSERT INTO `inventory` VALUES (5, 5, 100);
INSERT INTO `inventory` VALUES (5, 7, 200);
INSERT INTO `inventory` VALUES (5, 9, 5);
INSERT INTO `inventory` VALUES (5, 10, 100);
INSERT INTO `inventory` VALUES (5, 14, 1);
INSERT INTO `inventory` VALUES (5, 20, 2);
INSERT INTO `inventory` VALUES (5, 21, 1);
INSERT INTO `inventory` VALUES (5, 24, 100);
INSERT INTO `inventory` VALUES (5, 25, 150);
INSERT INTO `inventory` VALUES (5, 26, 200);
INSERT INTO `inventory` VALUES (5, 28, 500);

-- ----------------------------
-- Table structure for products
-- ----------------------------
DROP TABLE IF EXISTS `products`;
CREATE TABLE `products`  (
  `ProductID` int(0) NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `InventoryAmount` int(0) NOT NULL,
  `Price` decimal(10, 2) NOT NULL,
  `ProductKind` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `ImgUrl` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`ProductID`) USING BTREE,
  INDEX `Name`(`Name`) USING BTREE,
  INDEX `Price`(`Price`) USING BTREE,
  INDEX `ID`(`ProductID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of products
-- ----------------------------
INSERT INTO `products` VALUES (1, 'Playstation DualSense Wireless Controller', 200, 69.00, 'Video Games', 'https://m.media-amazon.com/images/I/61O9tWR6WDS._SL1475_.jpg');
INSERT INTO `products` VALUES (2, 'Lenovo Legion 7 15 Gaming Laptop', 10, 1599.00, 'Electronics', 'https://m.media-amazon.com/images/I/81XL0ZIr1ML._AC_SL1500_.jpg');
INSERT INTO `products` VALUES (3, 'Alienware m15 R4 Gaming Laptop', 20, 1899.99, 'Electronics', 'https://m.media-amazon.com/images/I/71Jp27bTQoL._AC_SL1500_.jpg');
INSERT INTO `products` VALUES (4, '2020 Apple MacBook Air Laptop', 22, 899.00, 'Electronics', 'https://m.media-amazon.com/images/I/71jG+e7roXL._AC_SL1500_.jpg');
INSERT INTO `products` VALUES (5, 'WYZE Cam Outdoor Starter Bundle', 500, 69.98, 'Smart Homes', 'https://m.media-amazon.com/images/I/41SyuiCk7JL._AC_SL1001_.jpg');
INSERT INTO `products` VALUES (6, 'Arlo Pro 3 Floodlight Camera', 300, 197.70, 'Smart Homes', 'https://m.media-amazon.com/images/I/71v95EYv1-L._AC_SL1500_.jpg');
INSERT INTO `products` VALUES (7, 'Ring Chime Pro', 500, 49.99, 'Smart Homes', 'https://m.media-amazon.com/images/I/51BSSCAJ6YL._SL1000_.jpg');
INSERT INTO `products` VALUES (8, 'eufy Security, eufyCam 2C Pro 2-Cam Kit', 400, 319.99, 'Smart Homes', 'https://m.media-amazon.com/images/I/61DJ0pnbv+L._AC_SL1500_.jpg');
INSERT INTO `products` VALUES (9, 'SimpliSafe 8 Piece Wireless Home Security System', 30, 183.99, 'Smart Homes', 'https://m.media-amazon.com/images/I/61HWU5sxfaL._AC_SL1500_.jpg');
INSERT INTO `products` VALUES (10, 'Original HP 63XL Black High-yield Ink Cartridge', 300, 39.89, 'Office Products', 'https://m.media-amazon.com/images/I/71dknWOvquL._AC_SL1500_.jpg');
INSERT INTO `products` VALUES (11, 'HP DeskJet 4155e All-in-One Wireless Color Printer', 20, 109.99, 'Office Products', 'https://m.media-amazon.com/images/I/61tJLchnj-S._AC_SL1500_.jpg');
INSERT INTO `products` VALUES (12, 'iCODIS X9 Book Scanner & Document Camera', 2, 298.00, 'Office Products', 'https://m.media-amazon.com/images/I/51uyp7bnmkL._AC_SL1000_.jpg');
INSERT INTO `products` VALUES (13, 'Amazon Basics 8-Sheet Capacity, Cross-Cut Paper and Credit Card Shredder', 5, 30.82, 'Office Products', 'https://m.media-amazon.com/images/I/71IywmQMCTL._AC_SL1500_.jpg');
INSERT INTO `products` VALUES (14, 'Scotch Thermal Laminating Pouche', 6, 27.99, 'Office Products', 'https://m.media-amazon.com/images/I/81b2L5te-OL._AC_SL1500_.jpg');
INSERT INTO `products` VALUES (15, 'Everlasting Comfort Office Chair Seat Cushion Pillow for Back', 6, 49.95, 'Office Products', 'https://m.media-amazon.com/images/I/71OO1C+T7WL._AC_SL1500_.jpg');
INSERT INTO `products` VALUES (16, 'Home Office Chair Ergonomic Desk Chair', 3, 36.99, 'Office Products', 'https://m.media-amazon.com/images/I/61DvQT-4r6S._AC_SL1500_.jpg');
INSERT INTO `products` VALUES (17, 'Soundance Laptop Stand', 2, 26.99, 'Office Products', 'https://m.media-amazon.com/images/I/81MN9l2nl2S._AC_SL1500_.jpg');
INSERT INTO `products` VALUES (18, 'Pokémon Brilliant Diamond - Nintendo Switch', 3, 59.88, 'Video Games', 'https://m.media-amazon.com/images/I/81+bcLr4jYL._SL1500_.jpg');
INSERT INTO `products` VALUES (19, 'Nintendo Game & Watch: The Legend of Zelda', 5, 49.99, 'Video Games', 'https://m.media-amazon.com/images/I/61DJLdMha3L._SL1081_.jpg');
INSERT INTO `products` VALUES (20, 'Just Dance 2022 - Nintendo Switch', 2, 41.88, 'Video Games', 'https://m.media-amazon.com/images/I/817uuhZRSwL._SL1500_.jpg');
INSERT INTO `products` VALUES (21, 'Oculus Quest 2 — Advanced All-In-One Virtual Reality Headset — 256 GB', 2, 399.00, 'Video Games', 'https://m.media-amazon.com/images/I/61kwRNPtMpL._SL1500_.jpg');
INSERT INTO `products` VALUES (22, 'Metroid Dread - Nintendo Switch', 5, 59.88, 'Video Games', 'https://m.media-amazon.com/images/I/71E+KjuboFL._SL1500_.jpg');
INSERT INTO `products` VALUES (23, 'KIWIHOME PS5 Cooling Fan with LED Light', 30, 16.99, 'Video Games', 'https://m.media-amazon.com/images/I/612NZMx5VeL._AC_SL1500_.jpg');
INSERT INTO `products` VALUES (24, 'Aveeno Baby Daily Care Gift Set', 400, 10.99, 'Beauty', 'https://m.media-amazon.com/images/I/81HicrmDRBL._AC_SL1500_.jpg');
INSERT INTO `products` VALUES (25, 'Olaplex No.7 Bonding Oil', 600, 28.00, 'Beauty', 'https://m.media-amazon.com/images/I/71yAldlT+WL._SL1500_.jpg');
INSERT INTO `products` VALUES (26, 'Neutrogena Makeup Remover Facial Cleansing Towelette Singles', 1000, 5.96, 'Beauty', 'https://m.media-amazon.com/images/I/819kWnxrBlL._SL1500_.jpg');
INSERT INTO `products` VALUES (27, 'Aquaphor Healing Ointment - Dry Skin Moisturizer', 3000, 8.36, 'Beauty', 'https://m.media-amazon.com/images/I/81L2KuM6J-L._SL1500_.jpg');
INSERT INTO `products` VALUES (28, 'ProactivMD Adapalene Gel Acne Kit', 2000, 34.20, 'Beauty', 'https://m.media-amazon.com/images/I/710wE+UrbES._SL1500_.jpg');

-- ----------------------------
-- Table structure for region
-- ----------------------------
DROP TABLE IF EXISTS `region`;
CREATE TABLE `region`  (
  `RegionID` int(0) NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `Manager` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`RegionID`) USING BTREE,
  INDEX `Manager`(`Manager`) USING BTREE,
  INDEX `ID`(`RegionID`) USING BTREE,
  CONSTRAINT `region_ibfk_1` FOREIGN KEY (`Manager`) REFERENCES `salesperson` (`Name`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of region
-- ----------------------------
INSERT INTO `region` VALUES (1, 'Pittsburgh', 'Jackie');
INSERT INTO `region` VALUES (2, 'NYC', 'James');
INSERT INTO `region` VALUES (3, 'Boston', 'Nancy');
INSERT INTO `region` VALUES (4, 'Newark', 'Pace');
INSERT INTO `region` VALUES (5, 'Philidelphia', 'Van');

-- ----------------------------
-- Table structure for salesperson
-- ----------------------------
DROP TABLE IF EXISTS `salesperson`;
CREATE TABLE `salesperson`  (
  `SalesPersonID` int(0) NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `JobTitle` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `StoreAssigned` int(0) NOT NULL,
  `Salary` decimal(10, 2) NOT NULL,
  PRIMARY KEY (`SalesPersonID`) USING BTREE,
  INDEX `Name`(`Name`) USING BTREE,
  INDEX `StoreAssigned`(`StoreAssigned`) USING BTREE,
  INDEX `ID`(`SalesPersonID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of salesperson
-- ----------------------------
INSERT INTO `salesperson` VALUES (1, 'Charley', '1905 Webster Ave', 'charley@tmpmail.org', 'Sales', 1, 2000.00);
INSERT INTO `salesperson` VALUES (2, 'Jackie', '559 Montague Wy', 'jackie@tmpmail.org', 'Manager', 1, 5000.00);
INSERT INTO `salesperson` VALUES (3, 'James', '1265 Gerard Ave', 'james@tmpmail.org', 'Manager', 2, 5000.00);
INSERT INTO `salesperson` VALUES (4, 'Jamie', '1280 Findlay Ave', 'jamie@tmpmail.org', 'Sales', 2, 2000.00);
INSERT INTO `salesperson` VALUES (5, 'Jan', '1343 Washington Ave', 'jan@tmpmail.org', 'Sales', 2, 2000.00);
INSERT INTO `salesperson` VALUES (6, 'Nancy', '33 Blossom St', 'nancy@tmpmail.org', 'Manager', 3, 5000.00);
INSERT INTO `salesperson` VALUES (7, 'Nathan', '104 Fulkerson St', 'nathan@tmpmail.org', 'Sales', 3, 2000.00);
INSERT INTO `salesperson` VALUES (8, 'Pace', '8 Faith Ct', 'pace@tmpmail.org', 'Manager', 4, 5000.00);
INSERT INTO `salesperson` VALUES (9, 'Raleigh', '387 Springfield Ave', 'raleigh@tmpmail.org', 'Sales', 4, 2000.00);
INSERT INTO `salesperson` VALUES (10, 'Van', '1631 N Dover St', 'van@tmpmail.org', 'Manager', 5, 5000.00);

-- ----------------------------
-- Table structure for store
-- ----------------------------
DROP TABLE IF EXISTS `store`;
CREATE TABLE `store`  (
  `StoreID` int(0) NOT NULL AUTO_INCREMENT,
  `Address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Manager` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `NumberOfSalespersons` int(0) NOT NULL,
  `Region` int(0) NOT NULL,
  PRIMARY KEY (`StoreID`) USING BTREE,
  INDEX `Manager`(`Manager`) USING BTREE,
  INDEX `Region`(`Region`) USING BTREE,
  INDEX `ID`(`StoreID`) USING BTREE,
  CONSTRAINT `store_ibfk_1` FOREIGN KEY (`Manager`) REFERENCES `salesperson` (`Name`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `store_ibfk_2` FOREIGN KEY (`Region`) REFERENCES `region` (`RegionID`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of store
-- ----------------------------
INSERT INTO `store` VALUES (1, '1905 Webster Ave', 'Jackie', 2, 1);
INSERT INTO `store` VALUES (2, '67 Manhattan Ave', 'James', 3, 2);
INSERT INTO `store` VALUES (3, '41-45 Broad St', 'Nancy', 2, 3);
INSERT INTO `store` VALUES (4, '62b Quitman St', 'Pace', 2, 4);
INSERT INTO `store` VALUES (5, '2916 Cecil B. Moore Ave', 'Van', 1, 5);

-- ----------------------------
-- Table structure for transactions
-- ----------------------------
DROP TABLE IF EXISTS `transactions`;
CREATE TABLE `transactions`  (
  `OrderNumber` int(0) NOT NULL AUTO_INCREMENT,
  `Date` date NOT NULL,
  `SalespersonName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `ProductID` int(0) NOT NULL,
  `ProductKind` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `ProductsName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `ProductsPrice` decimal(10, 2) NOT NULL,
  `NumberOfProducts` int(0) NOT NULL,
  `TotalGrossIncome` decimal(10, 2) NOT NULL,
  `CustomerID` int(0) NOT NULL,
  `Status` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`OrderNumber`) USING BTREE,
  INDEX `ProductsName`(`ProductsName`) USING BTREE,
  INDEX `ProductsPrice`(`ProductsPrice`) USING BTREE,
  INDEX `CustomerID`(`CustomerID`) USING BTREE,
  INDEX `OrderNumber`(`OrderNumber`) USING BTREE,
  INDEX `ProductID`(`ProductID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of transactions
-- ----------------------------
INSERT INTO `transactions` VALUES (1, '2020-01-01', 'Charley', 1, 'Video Games', 'Playstation DualSense Wireless Controller', 69.00, 1, 69.00, 1, 'Finished');
INSERT INTO `transactions` VALUES (2, '2020-01-08', 'Charley', 2, 'Electronics', 'Lenovo Legion 7 15 Gaming Laptop', 1599.00, 1, 1599.00, 2, 'Finished');
INSERT INTO `transactions` VALUES (3, '2020-01-17', 'Jackie', 1, 'Video Games', 'Playstation DualSense Wireless Controller', 69.00, 20, 1380.00, 1, 'Pending');
INSERT INTO `transactions` VALUES (4, '2020-01-21', 'Jan', 8, 'Smart Homes', 'eufy Security, eufyCam 2C Pro 2-Cam Kit', 319.99, 1, 319.99, 12, 'Finished');
INSERT INTO `transactions` VALUES (5, '2020-02-05', 'Jamie', 17, 'Office Products', 'Soundance Laptop Stand', 26.99, 10, 269.90, 11, 'Finished');

SET FOREIGN_KEY_CHECKS = 1;
