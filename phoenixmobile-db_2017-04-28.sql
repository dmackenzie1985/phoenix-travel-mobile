-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Apr 28, 2017 at 07:06 AM
-- Server version: 5.6.35
-- PHP Version: 7.1.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `phoenixmobile`
--

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `Customer_Id` char(6) NOT NULL,
  `First_Name` varchar(35) NOT NULL,
  `Middle_Initial` char(1) DEFAULT NULL,
  `Last_Name` varchar(35) NOT NULL,
  `Street_No` smallint(6) NOT NULL,
  `Street_Name` varchar(50) NOT NULL,
  `Suburb` varchar(35) NOT NULL,
  `Postcode` int(11) NOT NULL,
  `Email` varchar(150) NOT NULL,
  `Phone` varchar(10) DEFAULT NULL,
  `Enabled` int(1) NOT NULL,
  `Akey` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`Customer_Id`, `First_Name`, `Middle_Initial`, `Last_Name`, `Street_No`, `Street_Name`, `Suburb`, `Postcode`, `Email`, `Phone`, `Enabled`, `Akey`) VALUES
('000001', 'Bobby', 'A', 'Builder', 10, 'Fake Street', 'Fakesville', 3000, 'bbuilder@gmail.com', '0395462187', 0, '2c004ca0bcbf7c3d137ed32006a465e1'),
('001484', 'William', 'B', 'Pitt', 200, 'St. Kilda Road', 'St. Kilda', 3147, 'bill.pitt@gmail.com', '351806451', 0, '041bbb5b2cbe8c36d00e417bb3b2686f'),
('031642', 'Freddie', NULL, 'Khan', 500, 'Waverly Road', 'Chadstone', 3555, 'fred.khan@holmesglen.edu.au', NULL, 0, '041bbb5b2cbe8c36d00e417bb3b2686f');

-- --------------------------------------------------------

--
-- Table structure for table `customer_bookings`
--

CREATE TABLE `customer_bookings` (
  `Trip_Booking_No` char(6) NOT NULL,
  `Customer_Id` char(6) NOT NULL,
  `Num_Concessions` int(11) NOT NULL,
  `Num_Adults` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `customer_bookings`
--

INSERT INTO `customer_bookings` (`Trip_Booking_No`, `Customer_Id`, `Num_Concessions`, `Num_Adults`) VALUES
('004564', '031642', 2, 2),
('007214', '001484', 1, 0),
('007814', '000001', 2, 2),
('008050', '001484', 2, 0);

-- --------------------------------------------------------

--
-- Table structure for table `customer_reviews`
--

CREATE TABLE `customer_reviews` (
  `Trip_Id` char(6) NOT NULL,
  `Customer_Id` char(6) NOT NULL,
  `Rating` tinyint(4) NOT NULL,
  `General_Feedback` varchar(256) DEFAULT NULL,
  `Likes` varchar(256) DEFAULT NULL,
  `Dislikes` varchar(256) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `customer_reviews`
--

INSERT INTO `customer_reviews` (`Trip_Id`, `Customer_Id`, `Rating`, `General_Feedback`, `Likes`, `Dislikes`) VALUES
('004572', '031642', 5, 'Excellent trip, I will be booking with you guys again next year!', 'The whole trip was very reasonably priced.', 'None!'),
('167005', '001484', 3, 'It was okay, not as good as Kontiki', 'Staff were nice', 'The food was rubbish'),
('343271', '000001', 3, 'Too short', 'Friendly staff', 'Bus Broke down too many times'),
('343271', '001484', 4, 'Better than the last one', 'Staff were nice like last time and the food was better', 'The tour bus was too noisy');

-- --------------------------------------------------------

--
-- Table structure for table `itineraries`
--

CREATE TABLE `itineraries` (
  `Trip_Id` char(6) NOT NULL,
  `Day_No` tinyint(4) NOT NULL,
  `Hotel_Booking_No` char(6) NOT NULL,
  `Activities` varchar(150) DEFAULT NULL,
  `Meals` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `itineraries`
--

INSERT INTO `itineraries` (`Trip_Id`, `Day_No`, `Hotel_Booking_No`, `Activities`, `Meals`) VALUES
('004572', 1, '000342', 'Guided tour around the CBD', 'Lunch on Lygon Street'),
('004572', 2, '66457', 'Mt Arthur Chair Lift', 'Lunch At Arthurs Seat'),
('167005', 1, '000599', 'Wine tasting at Pizzini\'s', 'Lunch at Pizzini\'s');

-- --------------------------------------------------------

--
-- Table structure for table `tours`
--

CREATE TABLE `tours` (
  `Tour_No` char(3) NOT NULL,
  `Tour_Name` varchar(70) NOT NULL,
  `Description` varchar(100) NOT NULL,
  `Duration` float DEFAULT NULL,
  `Route_Map` varchar(256) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tours`
--

INSERT INTO `tours` (`Tour_No`, `Tour_Name`, `Description`, `Duration`, `Route_Map`) VALUES
('021', 'Twelve Apostles Drive', 'A drive along the Great Ocean Road to the Twelve Apostles', 28, NULL),
('047', 'Northeast Wineries Tour', 'A tour to various wineries in North East Victoria', 32, NULL),
('055', 'Melbourne Sightseeing', 'A drive along the Great Ocean Road to the Twelve Apostles', 3.5, 'C:DocumentsRoute_MapsMelbourne_Sightseeing.png');

-- --------------------------------------------------------

--
-- Table structure for table `trips`
--

CREATE TABLE `trips` (
  `Trip_Id` char(6) NOT NULL,
  `Tour_No` char(3) NOT NULL,
  `Rego_No` char(6) NOT NULL,
  `Departure_Date` date DEFAULT NULL,
  `Passengers_Booked` int(11) NOT NULL,
  `Max_Passengers` int(11) NOT NULL,
  `Standard_Amount` decimal(6,2) DEFAULT NULL,
  `Concession_Amount` decimal(6,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `trips`
--

INSERT INTO `trips` (`Trip_Id`, `Tour_No`, `Rego_No`, `Departure_Date`, `Passengers_Booked`, `Max_Passengers`, `Standard_Amount`, `Concession_Amount`) VALUES
('004572', '055', 'EIU112', '2016-05-15', 4, 62, '100.00', '80.00'),
('004640', '055', 'EIU112', '2016-06-23', 4, 62, '200.00', '150.00'),
('167005', '047', 'TPO652', '2016-10-20', 1, 51, '120.00', '80.00'),
('343271', '021', 'JDO682', '2016-12-04', 3, 3, '400.00', '250.00');

-- --------------------------------------------------------

--
-- Table structure for table `trip_bookings`
--

CREATE TABLE `trip_bookings` (
  `Trip_Booking_No` char(6) NOT NULL,
  `Trip_Id` char(6) NOT NULL,
  `Booking_Date` date DEFAULT NULL,
  `Deposit_Amount` decimal(6,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `trip_bookings`
--

INSERT INTO `trip_bookings` (`Trip_Booking_No`, `Trip_Id`, `Booking_Date`, `Deposit_Amount`) VALUES
('004564', '004572', '2016-08-15', '100.00'),
('007214', '167005', '2016-05-27', '500.00'),
('007814', '004640', '2017-04-12', '500.00'),
('008050', '343271', '2016-11-01', '150.00');

-- --------------------------------------------------------

--
-- Table structure for table `vehicles`
--

CREATE TABLE `vehicles` (
  `Rego_No` char(6) NOT NULL,
  `VIN` varchar(20) NOT NULL,
  `Make` varchar(20) NOT NULL,
  `Model` varchar(35) NOT NULL,
  `Year` int(11) NOT NULL,
  `Capacity` smallint(6) NOT NULL,
  `Fuel_Type` varchar(8) DEFAULT NULL,
  `Equipment` varchar(100) DEFAULT NULL,
  `Licence_Required` char(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `vehicles`
--

INSERT INTO `vehicles` (`Rego_No`, `VIN`, `Make`, `Model`, `Year`, `Capacity`, `Fuel_Type`, `Equipment`, `Licence_Required`) VALUES
('ABC321', 'WDB9063434534534', 'Mercedes', 'Minibus', 2011, 35, 'Diesel', 'Fire extinguisher', 'LR'),
('AKJ424', '8Y2340JDSNKL9HGS9', 'BCI', 'Fleetmaster 55', 2010, 87, 'Diesel', 'Fire extinguisher, 5 tents, 3 kayaks', 'MR'),
('EIU112', 'SPG4VLEHSDZ98U454', 'Scania', 'K230UB', 2007, 64, 'Diesel', NULL, 'MR'),
('JDO682', '90JERN34F9DF3450F', 'Holden', 'Commodore', 2008, 5, 'Petrol', NULL, 'C'),
('MCN687', 'T3NF8S0D99l9FK6V5', 'BCI', 'Proma', 2011, 35, 'Diesel', 'Fire extinguisher', 'LR'),
('TPO652', '90S8U449S8G9K5N8L', 'Scania', 'K320UB', 2010, 53, 'Diesel', NULL, 'HR');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`Customer_Id`);

--
-- Indexes for table `customer_bookings`
--
ALTER TABLE `customer_bookings`
  ADD PRIMARY KEY (`Trip_Booking_No`,`Customer_Id`),
  ADD KEY `CB_Customer_fk` (`Customer_Id`);

--
-- Indexes for table `customer_reviews`
--
ALTER TABLE `customer_reviews`
  ADD PRIMARY KEY (`Trip_Id`,`Customer_Id`),
  ADD KEY `CR_Customer_fk` (`Customer_Id`);

--
-- Indexes for table `itineraries`
--
ALTER TABLE `itineraries`
  ADD PRIMARY KEY (`Trip_Id`,`Day_No`);

--
-- Indexes for table `tours`
--
ALTER TABLE `tours`
  ADD PRIMARY KEY (`Tour_No`);

--
-- Indexes for table `trips`
--
ALTER TABLE `trips`
  ADD PRIMARY KEY (`Trip_Id`),
  ADD KEY `T_Tour_fk` (`Tour_No`),
  ADD KEY `T_Vehicle_fk` (`Rego_No`);

--
-- Indexes for table `trip_bookings`
--
ALTER TABLE `trip_bookings`
  ADD PRIMARY KEY (`Trip_Booking_No`),
  ADD KEY `TB_Trip_fk` (`Trip_Id`);

--
-- Indexes for table `vehicles`
--
ALTER TABLE `vehicles`
  ADD PRIMARY KEY (`Rego_No`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `customer_bookings`
--
ALTER TABLE `customer_bookings`
  ADD CONSTRAINT `CB_Customer_fk` FOREIGN KEY (`Customer_Id`) REFERENCES `customers` (`Customer_Id`),
  ADD CONSTRAINT `CB_Trip_Booking_fk` FOREIGN KEY (`Trip_Booking_No`) REFERENCES `trip_bookings` (`Trip_Booking_No`);

--
-- Constraints for table `customer_reviews`
--
ALTER TABLE `customer_reviews`
  ADD CONSTRAINT `CR_Customer_fk` FOREIGN KEY (`Customer_Id`) REFERENCES `customers` (`Customer_Id`),
  ADD CONSTRAINT `CR_Trip_fk` FOREIGN KEY (`Trip_Id`) REFERENCES `trips` (`Trip_Id`);

--
-- Constraints for table `itineraries`
--
ALTER TABLE `itineraries`
  ADD CONSTRAINT `I_Trip_fk` FOREIGN KEY (`Trip_Id`) REFERENCES `trips` (`Trip_Id`);

--
-- Constraints for table `trips`
--
ALTER TABLE `trips`
  ADD CONSTRAINT `T_Tour_fk` FOREIGN KEY (`Tour_No`) REFERENCES `tours` (`Tour_No`),
  ADD CONSTRAINT `T_Vehicle_fk` FOREIGN KEY (`Rego_No`) REFERENCES `vehicles` (`Rego_No`);

--
-- Constraints for table `trip_bookings`
--
ALTER TABLE `trip_bookings`
  ADD CONSTRAINT `TB_Trip_fk` FOREIGN KEY (`Trip_Id`) REFERENCES `trips` (`Trip_Id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
