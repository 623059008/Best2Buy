-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- 主机： 127.0.0.1
-- 生成日期： 2021-12-01 06:59:23
-- 服务器版本： 8.0.26
-- PHP 版本： 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `Best2buy`
--

-- --------------------------------------------------------

--
-- 表的结构 `businesscustomer`
--

CREATE TABLE `businesscustomer` (
  `CustomerID` int NOT NULL,
  `Name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `BusinessCategory` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `GrossAnnualIncome` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;

--
-- 转存表中的数据 `businesscustomer`
--

INSERT INTO `businesscustomer` (`CustomerID`, `Name`, `BusinessCategory`, `GrossAnnualIncome`) VALUES
(1, 'Aaron', 'Trading', '200000'),
(3, 'Dallas', 'Trading', '500000'),
(5, 'Gail', 'Trading', '300000'),
(7, 'Campbell	\r\nCampbell	\r\nCampbell', 'Manufacturing', '600000'),
(9, 'Lacey', 'Manufacturing', '1000000'),
(11, 'Madonna', 'Manufacturing', '111000'),
(13, 'Oliver', 'Manufacturing', '302000'),
(15, 'Ramsey', 'Manufacturing', '403000'),
(17, 'Catherina', 'Trading', '500030'),
(19, 'Chamberlain', 'Trading', '390000');

-- --------------------------------------------------------

--
-- 表的结构 `customers`
--

CREATE TABLE `customers` (
  `CustomerID` int NOT NULL,
  `Name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Street` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `City` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `State` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `ZipCode` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `Kind` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Tel` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;

--
-- 转存表中的数据 `customers`
--

INSERT INTO `customers` (`CustomerID`, `Name`, `Street`, `City`, `State`, `ZipCode`, `Kind`, `Password`, `Tel`, `Email`) VALUES
(1, 'Aaron', '208 N Craig St', 'Pittsburgh', 'PA', '15213', 'Business', '81dc9bdb52d04dc20036dbd8313ed055', '4122223333', 'aaron@tmpbox.net'),
(2, 'Dale', '422 Noble St', 'Pittsburgh', 'PA', '15232', 'Home', '81dc9bdb52d04dc20036dbd8313ed055', '4126667777', 'dale@tmpbox.net '),
(3, 'Dallas', '147 Julius St', 'Pittsburgh', 'PA', '15206', 'Business', '81dc9bdb52d04dc20036dbd8313ed055', '4121111111', 'dallas@tmpbox.net'),
(4, 'Damian', '6411 Deary St', 'Pittsburgh', 'PA', '15206', 'Home', '81dc9bdb52d04dc20036dbd8313ed055', '4123334444', 'damian@tmpbox.net'),
(5, 'Gail', '925 Woodbine St', 'Pitssburgh', 'PA', '15201', 'Business', '', '4125556666', 'gail@tmpbox.net'),
(6, 'Garfield', '5442 Wakefield St', 'Philadelphia', 'PA', '19144', 'Home', '', '2151111111', 'garfield@tmpbox.net'),
(7, 'Campbell	\r\nCampbell	\r\nCampbell', '5604 Baynton St', 'Philadelphia', 'PA', '19144', 'Business', '', '2152222222', 'campbell@tmpbox.net'),
(8, 'Camilla', '5390 Magnolia St', 'Philadelphia', 'PA', '19144', 'Home', '', '2153333333', 'camilla@tmpbox.net'),
(9, 'Lacey', '5750 Virginian Rd', 'Philadelphia', 'PA', '19141', 'Business', '', '2154444444', 'lacey@tmpbox.net'),
(10, 'Madeline', '6047 N 13th St', 'Philadelphia', 'PA', '19141', 'Home', '', '2155555555', 'madeline@tmpbox.net'),
(11, 'Madonna', '219 E 30th St', 'NYC', 'NY', '10016', 'Business', '', '2121111111', 'madonna@tmpbox.net'),
(12, 'Mae', '16 E 65th St', 'NYC', 'NY', '10065', 'Home', '', '2122222222', 'mae@tmpbox.net'),
(13, 'Oliver', '216 E 83rd St', 'NYC', 'NY', '10028', 'Business', '', '2123333333', 'oliver@tmpbox.net'),
(14, 'Rachel', '429 E 84th St', 'NYC', 'NY', '10028', 'Home', '', '2124444444', 'rachel@tmpbox.net'),
(15, 'Ramsey', '34 Prince St', 'Boston', 'MA', '02113', 'Business', '', '6171111111', 'ramsey@tmpbox.net'),
(16, 'Randall', '101 Beverly St', 'Boston', 'MA', '02114', 'Home', '', '6172222222', 'randall@tmpbox.net'),
(17, 'Catherina', '8 Pinckney St', 'Boston', 'MA', '02108', 'Business', '', '6173333333', 'catherina@tmpbox.net'),
(18, 'Cecil', '37 Halstead St', 'Newark', 'NJ', '07106', 'Home', '', '8621111111', 'cecil@tmpbox.net'),
(19, 'Chamberlain', '332 Grove St', 'Newark', 'NJ', '07103', 'Business', '81dc9bdb52d04dc20036dbd8313ed055', '8622222222', 'chamberlain@tmpbox.net'),
(20, 'Chambers', '191 S 10th St', 'Newark', 'NJ', '07107', 'Home', '81dc9bdb52d04dc20036dbd8313ed055', '8623333333', 'chambers@tmpbox.net'),
(21, 'Rua', '446 Natchez St', 'Pitssburgh', 'PA', '15211', 'Administrator', '81dc9bdb52d04dc20036dbd8313ed055', '4120000000', 'rua@tmpbox.net'),
(22, 'Tao Ren', '5562 Hobart St.', 'Pittsburgh', 'PA', '15225', 'Administrator', '81dc9bdb52d04dc20036dbd8313ed055', '4129839571', 'tar118@pitt.edu');

-- --------------------------------------------------------

--
-- 表的结构 `homecustomer`
--

CREATE TABLE `homecustomer` (
  `CustomerID` int NOT NULL,
  `Name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Gender` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Age` int NOT NULL,
  `MarriageStatus` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Income` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;

--
-- 转存表中的数据 `homecustomer`
--

INSERT INTO `homecustomer` (`CustomerID`, `Name`, `Gender`, `Age`, `MarriageStatus`, `Income`) VALUES
(2, 'Dale', 'M', 23, 'Single', 3000),
(4, 'Damian', 'M', 54, 'Married', 2000),
(6, 'Garfield', 'M', 33, 'Single', 5000),
(8, 'Camilla', 'F', 23, 'Single', 3000),
(10, 'Madeline', 'F', 37, 'Single', 2000),
(12, 'Mae', 'F', 74, 'Married', 7000),
(14, 'Rachel', 'F', 10, 'Single', 0),
(16, 'Randall', 'M', 30, 'Single', 4000),
(18, 'Cecil', 'M', 20, 'Single', 900),
(20, 'Chambers', 'F', 25, 'Married', 6000);

-- --------------------------------------------------------

--
-- 表的结构 `inventory`
--

CREATE TABLE `inventory` (
  `StoreID` int NOT NULL,
  `ProductID` int NOT NULL,
  `NumberOfProduct` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;

--
-- 转存表中的数据 `inventory`
--

INSERT INTO `inventory` (`StoreID`, `ProductID`, `NumberOfProduct`) VALUES
(1, 1, 30),
(1, 2, 4),
(1, 6, 50),
(1, 8, 150),
(1, 9, 5),
(1, 10, 30),
(1, 13, 2),
(1, 15, 3),
(1, 17, 2),
(1, 21, 1),
(1, 23, 10),
(1, 25, 100),
(1, 26, 200),
(1, 29, 0),
(2, 1, 50),
(2, 2, 4),
(2, 5, 100),
(2, 6, 150),
(2, 8, 100),
(2, 10, 70),
(2, 11, 11),
(2, 12, 1),
(2, 14, 3),
(2, 15, 3),
(2, 18, 3),
(2, 22, 2),
(2, 24, 100),
(2, 25, 300),
(2, 26, 200),
(2, 27, 1000),
(3, 1, 50),
(3, 2, 1),
(3, 3, 20),
(3, 5, 200),
(3, 7, 300),
(3, 9, 20),
(3, 10, 100),
(3, 12, 1),
(3, 16, 3),
(3, 22, 3),
(3, 23, 20),
(3, 24, 200),
(3, 25, 50),
(3, 26, 200),
(3, 27, 2000),
(4, 1, 30),
(4, 4, 11),
(4, 5, 100),
(4, 6, 100),
(4, 8, 150),
(4, 11, 9),
(4, 13, 3),
(4, 14, 2),
(4, 19, 5),
(4, 25, 100),
(4, 26, 200),
(4, 28, 1500),
(5, 1, 40),
(5, 4, 11),
(5, 5, 100),
(5, 7, 200),
(5, 9, 5),
(5, 10, 100),
(5, 14, 1),
(5, 20, 2),
(5, 21, 1),
(5, 24, 100),
(5, 25, 150),
(5, 26, 200),
(5, 28, 500);

-- --------------------------------------------------------

--
-- 表的结构 `products`
--

CREATE TABLE `products` (
  `ProductID` int NOT NULL,
  `Name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `InventoryAmount` int NOT NULL,
  `Price` decimal(10,2) NOT NULL,
  `ProductKind` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `ImgUrl` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;

--
-- 转存表中的数据 `products`
--

INSERT INTO `products` (`ProductID`, `Name`, `InventoryAmount`, `Price`, `ProductKind`, `ImgUrl`) VALUES
(1, 'Playstation DualSense Wireless Controller', 200, '69.00', 'Video Games', 'https://m.media-amazon.com/images/I/61O9tWR6WDS._SL1475_.jpg'),
(2, 'Lenovo Legion 7 15 Gaming Laptop', 10, '1599.00', 'Electronics', 'https://m.media-amazon.com/images/I/81XL0ZIr1ML._AC_SL1500_.jpg'),
(3, 'Alienware m15 R4 Gaming Laptop', 20, '1899.99', 'Electronics', 'https://m.media-amazon.com/images/I/71Jp27bTQoL._AC_SL1500_.jpg'),
(4, '2020 Apple MacBook Air Laptop', 22, '899.00', 'Electronics', 'https://m.media-amazon.com/images/I/71jG+e7roXL._AC_SL1500_.jpg'),
(5, 'WYZE Cam Outdoor Starter Bundle', 500, '69.98', 'Smart Homes', 'https://m.media-amazon.com/images/I/41SyuiCk7JL._AC_SL1001_.jpg'),
(6, 'Arlo Pro 3 Floodlight Camera', 300, '197.70', 'Smart Homes', 'https://m.media-amazon.com/images/I/71v95EYv1-L._AC_SL1500_.jpg'),
(7, 'Ring Chime Pro', 500, '49.99', 'Smart Homes', 'https://m.media-amazon.com/images/I/51BSSCAJ6YL._SL1000_.jpg'),
(8, 'eufy Security, eufyCam 2C Pro 2-Cam Kit', 400, '319.99', 'Smart Homes', 'https://m.media-amazon.com/images/I/61DJ0pnbv+L._AC_SL1500_.jpg'),
(9, 'SimpliSafe 8 Piece Wireless Home Security System', 30, '183.99', 'Smart Homes', 'https://m.media-amazon.com/images/I/61HWU5sxfaL._AC_SL1500_.jpg'),
(10, 'Original HP 63XL Black High-yield Ink Cartridge', 300, '39.89', 'Office Products', 'https://m.media-amazon.com/images/I/71dknWOvquL._AC_SL1500_.jpg'),
(11, 'HP DeskJet 4155e All-in-One Wireless Color Printer', 20, '109.99', 'Office Products', 'https://m.media-amazon.com/images/I/61tJLchnj-S._AC_SL1500_.jpg'),
(12, 'iCODIS X9 Book Scanner & Document Camera', 2, '298.00', 'Office Products', 'https://m.media-amazon.com/images/I/51uyp7bnmkL._AC_SL1000_.jpg'),
(13, 'Amazon Basics 8-Sheet Capacity, Cross-Cut Paper and Credit Card Shredder', 5, '30.82', 'Office Products', 'https://m.media-amazon.com/images/I/71IywmQMCTL._AC_SL1500_.jpg'),
(14, 'Scotch Thermal Laminating Pouche', 6, '27.99', 'Office Products', 'https://m.media-amazon.com/images/I/81b2L5te-OL._AC_SL1500_.jpg'),
(15, 'Everlasting Comfort Office Chair Seat Cushion Pillow for Back', 6, '49.95', 'Office Products', 'https://m.media-amazon.com/images/I/71OO1C+T7WL._AC_SL1500_.jpg'),
(16, 'Home Office Chair Ergonomic Desk Chair', 3, '36.99', 'Office Products', 'https://m.media-amazon.com/images/I/61DvQT-4r6S._AC_SL1500_.jpg'),
(17, 'Soundance Laptop Stand', 2, '26.99', 'Office Products', 'https://m.media-amazon.com/images/I/81MN9l2nl2S._AC_SL1500_.jpg'),
(18, 'Pokémon Brilliant Diamond - Nintendo Switch', 3, '59.88', 'Video Games', 'https://m.media-amazon.com/images/I/81+bcLr4jYL._SL1500_.jpg'),
(19, 'Nintendo Game & Watch: The Legend of Zelda', 5, '49.99', 'Video Games', 'https://m.media-amazon.com/images/I/61DJLdMha3L._SL1081_.jpg'),
(20, 'Just Dance 2022 - Nintendo Switch', 2, '41.88', 'Video Games', 'https://m.media-amazon.com/images/I/817uuhZRSwL._SL1500_.jpg'),
(21, 'Oculus Quest 2 — Advanced All-In-One Virtual Reality Headset — 256 GB', 2, '399.00', 'Video Games', 'https://m.media-amazon.com/images/I/61kwRNPtMpL._SL1500_.jpg'),
(22, 'Metroid Dread - Nintendo Switch', 5, '59.88', 'Video Games', 'https://m.media-amazon.com/images/I/71E+KjuboFL._SL1500_.jpg'),
(23, 'KIWIHOME PS5 Cooling Fan with LED Light', 30, '16.99', 'Video Games', 'https://m.media-amazon.com/images/I/612NZMx5VeL._AC_SL1500_.jpg'),
(24, 'Aveeno Baby Daily Care Gift Set', 400, '10.99', 'Beauty', 'https://m.media-amazon.com/images/I/81HicrmDRBL._AC_SL1500_.jpg'),
(25, 'Olaplex No.7 Bonding Oil', 600, '28.00', 'Beauty', 'https://m.media-amazon.com/images/I/71yAldlT+WL._SL1500_.jpg'),
(26, 'Neutrogena Makeup Remover Facial Cleansing Towelette Singles', 1000, '5.96', 'Beauty', 'https://m.media-amazon.com/images/I/819kWnxrBlL._SL1500_.jpg'),
(27, 'Aquaphor Healing Ointment - Dry Skin Moisturizer', 3000, '8.36', 'Beauty', 'https://m.media-amazon.com/images/I/81L2KuM6J-L._SL1500_.jpg'),
(28, 'ProactivMD Adapalene Gel Acne Kit', 2000, '34.20', 'Beauty', 'https://m.media-amazon.com/images/I/710wE+UrbES._SL1500_.jpg'),
(29, 'iPhone 13 Pro', 0, '1099.00', 'Smart Phone', 'https://www.notebookcheck.net/uploads/tx_nbc2/4_to_3_Teaser_Apple_iPhone_13_Pro.jpg');

-- --------------------------------------------------------

--
-- 表的结构 `region`
--

CREATE TABLE `region` (
  `RegionID` int NOT NULL,
  `Name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `Manager` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;

--
-- 转存表中的数据 `region`
--

INSERT INTO `region` (`RegionID`, `Name`, `Manager`) VALUES
(1, 'Pittsburgh', 'Jackie'),
(2, 'NYC', 'James'),
(3, 'Boston', 'Nancy'),
(4, 'Newark', 'Pace'),
(5, 'Philidelphia', 'Van'),
(7, 'SpaceShip', 'Tao Ren');

-- --------------------------------------------------------

--
-- 表的结构 `salesperson`
--

CREATE TABLE `salesperson` (
  `SalesPersonID` int NOT NULL,
  `Name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `JobTitle` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `StoreAssigned` int NOT NULL,
  `Salary` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;

--
-- 转存表中的数据 `salesperson`
--

INSERT INTO `salesperson` (`SalesPersonID`, `Name`, `Address`, `Email`, `JobTitle`, `StoreAssigned`, `Salary`) VALUES
(1, 'Charley', '1905 Webster Ave', 'charley@tmpmail.org', 'Sales', 1, '2000.00'),
(2, 'Jackie', '559 Montague Wy', 'jackie@tmpmail.org', 'Manager', 1, '5000.00'),
(3, 'James', '1265 Gerard Ave', 'james@tmpmail.org', 'Manager', 2, '5000.00'),
(4, 'Jamie', '1280 Findlay Ave', 'jamie@tmpmail.org', 'Sales', 2, '2000.00'),
(5, 'Jan', '1343 Washington Ave', 'jan@tmpmail.org', 'Sales', 2, '2000.00'),
(6, 'Nancy', '33 Blossom St', 'nancy@tmpmail.org', 'Manager', 3, '5000.00'),
(7, 'Nathan', '104 Fulkerson St', 'nathan@tmpmail.org', 'Sales', 3, '2000.00'),
(8, 'Pace', '8 Faith Ct', 'pace@tmpmail.org', 'Manager', 4, '5000.00'),
(9, 'Raleigh', '387 Springfield Ave', 'raleigh@tmpmail.org', 'Sales', 4, '2000.00'),
(10, 'Van', '1631 N Dover St', 'van@tmpmail.org', 'Manager', 5, '5000.00'),
(11, 'Tao Ren', '5562 Hobart St.', 'tar118@pitt.edu', 'Manager', 1, '19000.00');

-- --------------------------------------------------------

--
-- 表的结构 `store`
--

CREATE TABLE `store` (
  `StoreID` int NOT NULL,
  `Address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Manager` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `NumberOfSalespersons` int NOT NULL,
  `Region` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;

--
-- 转存表中的数据 `store`
--

INSERT INTO `store` (`StoreID`, `Address`, `Manager`, `NumberOfSalespersons`, `Region`) VALUES
(1, '1905 Webster Ave', 'Jackie', 2, 1),
(2, '67 Manhattan Ave', 'James', 3, 2),
(3, '41-45 Broad St', 'Nancy', 2, 3),
(4, '62b Quitman St', 'Pace', 2, 4),
(5, '2916 Cecil B. Moore Ave', 'Van', 1, 5);

-- --------------------------------------------------------

--
-- 表的结构 `transactions`
--

CREATE TABLE `transactions` (
  `OrderNumber` int NOT NULL,
  `Date` varchar(255) NOT NULL,
  `SalespersonName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `ProductID` int NOT NULL,
  `ProductKind` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `ProductsName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `ProductsPrice` decimal(10,2) NOT NULL,
  `NumberOfProducts` int NOT NULL,
  `TotalGrossIncome` decimal(10,2) NOT NULL,
  `CustomerID` int NOT NULL,
  `Status` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;

--
-- 转存表中的数据 `transactions`
--

INSERT INTO `transactions` (`OrderNumber`, `Date`, `SalespersonName`, `ProductID`, `ProductKind`, `ProductsName`, `ProductsPrice`, `NumberOfProducts`, `TotalGrossIncome`, `CustomerID`, `Status`) VALUES
(1, '2020-01-01', 'Charley', 1, 'Video Games', 'Playstation DualSense Wireless Controller', '69.00', 1, '69.00', 1, 'Finished'),
(2, '2020-01-08', 'Charley', 2, 'Electronics', 'Lenovo Legion 7 15 Gaming Laptop', '1599.00', 1, '1599.00', 2, 'Finished'),
(3, '2020-01-17', 'Jackie', 1, 'Video Games', 'Playstation DualSense Wireless Controller', '69.00', 20, '1380.00', 1, 'Pending'),
(4, '2020-01-21', 'Jan', 8, 'Smart Homes', 'eufy Security, eufyCam 2C Pro 2-Cam Kit', '319.99', 1, '319.99', 12, 'Finished'),
(5, '2020-02-05', 'Jamie', 17, 'Office Products', 'Soundance Laptop Stand', '26.99', 10, '269.90', 11, 'Finished');

--
-- 转储表的索引
--

--
-- 表的索引 `businesscustomer`
--
ALTER TABLE `businesscustomer`
  ADD PRIMARY KEY (`CustomerID`,`Name`) USING BTREE,
  ADD UNIQUE KEY `Name` (`Name`) USING BTREE,
  ADD KEY `ID` (`CustomerID`) USING BTREE;

--
-- 表的索引 `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`CustomerID`,`Tel`,`Email`) USING BTREE,
  ADD UNIQUE KEY `CustomerID` (`CustomerID`) USING BTREE,
  ADD KEY `Name` (`Name`) USING BTREE;

--
-- 表的索引 `homecustomer`
--
ALTER TABLE `homecustomer`
  ADD PRIMARY KEY (`CustomerID`,`Name`) USING BTREE,
  ADD UNIQUE KEY `Name` (`Name`) USING BTREE,
  ADD KEY `ID` (`CustomerID`) USING BTREE;

--
-- 表的索引 `inventory`
--
ALTER TABLE `inventory`
  ADD PRIMARY KEY (`StoreID`,`ProductID`) USING BTREE,
  ADD KEY `StoreID` (`StoreID`) USING BTREE,
  ADD KEY `ProductID` (`ProductID`) USING BTREE;

--
-- 表的索引 `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`ProductID`) USING BTREE,
  ADD KEY `Name` (`Name`) USING BTREE,
  ADD KEY `Price` (`Price`) USING BTREE,
  ADD KEY `ID` (`ProductID`) USING BTREE;

--
-- 表的索引 `region`
--
ALTER TABLE `region`
  ADD PRIMARY KEY (`RegionID`) USING BTREE,
  ADD KEY `Manager` (`Manager`) USING BTREE,
  ADD KEY `ID` (`RegionID`) USING BTREE;

--
-- 表的索引 `salesperson`
--
ALTER TABLE `salesperson`
  ADD PRIMARY KEY (`SalesPersonID`) USING BTREE,
  ADD KEY `Name` (`Name`) USING BTREE,
  ADD KEY `StoreAssigned` (`StoreAssigned`) USING BTREE,
  ADD KEY `ID` (`SalesPersonID`) USING BTREE;

--
-- 表的索引 `store`
--
ALTER TABLE `store`
  ADD PRIMARY KEY (`StoreID`) USING BTREE,
  ADD KEY `Manager` (`Manager`) USING BTREE,
  ADD KEY `Region` (`Region`) USING BTREE,
  ADD KEY `ID` (`StoreID`) USING BTREE;

--
-- 表的索引 `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`OrderNumber`) USING BTREE,
  ADD KEY `ProductsName` (`ProductsName`) USING BTREE,
  ADD KEY `ProductsPrice` (`ProductsPrice`) USING BTREE,
  ADD KEY `CustomerID` (`CustomerID`) USING BTREE,
  ADD KEY `OrderNumber` (`OrderNumber`) USING BTREE,
  ADD KEY `ProductID` (`ProductID`) USING BTREE;

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `customers`
--
ALTER TABLE `customers`
  MODIFY `CustomerID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- 使用表AUTO_INCREMENT `products`
--
ALTER TABLE `products`
  MODIFY `ProductID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- 使用表AUTO_INCREMENT `region`
--
ALTER TABLE `region`
  MODIFY `RegionID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- 使用表AUTO_INCREMENT `salesperson`
--
ALTER TABLE `salesperson`
  MODIFY `SalesPersonID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- 使用表AUTO_INCREMENT `store`
--
ALTER TABLE `store`
  MODIFY `StoreID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- 使用表AUTO_INCREMENT `transactions`
--
ALTER TABLE `transactions`
  MODIFY `OrderNumber` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- 限制导出的表
--

--
-- 限制表 `businesscustomer`
--
ALTER TABLE `businesscustomer`
  ADD CONSTRAINT `businesscustomer_ibfk_1` FOREIGN KEY (`CustomerID`) REFERENCES `customers` (`CustomerID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `businesscustomer_ibfk_2` FOREIGN KEY (`Name`) REFERENCES `customers` (`Name`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 限制表 `homecustomer`
--
ALTER TABLE `homecustomer`
  ADD CONSTRAINT `homecustomer_ibfk_1` FOREIGN KEY (`CustomerID`) REFERENCES `customers` (`CustomerID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `homecustomer_ibfk_2` FOREIGN KEY (`Name`) REFERENCES `customers` (`Name`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 限制表 `inventory`
--
ALTER TABLE `inventory`
  ADD CONSTRAINT `inventory_ibfk_1` FOREIGN KEY (`StoreID`) REFERENCES `store` (`StoreID`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `inventory_ibfk_2` FOREIGN KEY (`ProductID`) REFERENCES `products` (`ProductID`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- 限制表 `region`
--
ALTER TABLE `region`
  ADD CONSTRAINT `region_ibfk_1` FOREIGN KEY (`Manager`) REFERENCES `salesperson` (`Name`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- 限制表 `store`
--
ALTER TABLE `store`
  ADD CONSTRAINT `store_ibfk_1` FOREIGN KEY (`Manager`) REFERENCES `salesperson` (`Name`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `store_ibfk_2` FOREIGN KEY (`Region`) REFERENCES `region` (`RegionID`) ON DELETE RESTRICT ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
