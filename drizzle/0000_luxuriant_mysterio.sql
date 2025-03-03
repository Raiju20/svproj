-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `albums` (
	`AlbumId` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`Title` text(160) NOT NULL,
	`ArtistId` integer NOT NULL,
	FOREIGN KEY (`ArtistId`) REFERENCES `artists`(`ArtistId`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `IFK_AlbumArtistId` ON `albums` (`ArtistId`);--> statement-breakpoint
CREATE TABLE `artists` (
	`ArtistId` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`Name` text(120)
);
--> statement-breakpoint
CREATE TABLE `customers` (
	`CustomerId` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`FirstName` text(40) NOT NULL,
	`LastName` text(20) NOT NULL,
	`Company` text(80),
	`Address` text(70),
	`City` text(40),
	`State` text(40),
	`Country` text(40),
	`PostalCode` text(10),
	`Phone` text(24),
	`Fax` text(24),
	`Email` text(60) NOT NULL,
	`SupportRepId` integer,
	FOREIGN KEY (`SupportRepId`) REFERENCES `employees`(`EmployeeId`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `IFK_CustomerSupportRepId` ON `customers` (`SupportRepId`);--> statement-breakpoint
CREATE TABLE `employees` (
	`EmployeeId` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`LastName` text(20) NOT NULL,
	`FirstName` text(20) NOT NULL,
	`Title` text(30),
	`ReportsTo` integer,
	`BirthDate` numeric,
	`HireDate` numeric,
	`Address` text(70),
	`City` text(40),
	`State` text(40),
	`Country` text(40),
	`PostalCode` text(10),
	`Phone` text(24),
	`Fax` text(24),
	`Email` text(60),
	FOREIGN KEY (`ReportsTo`) REFERENCES `employees`(`EmployeeId`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `IFK_EmployeeReportsTo` ON `employees` (`ReportsTo`);--> statement-breakpoint
CREATE TABLE `genres` (
	`GenreId` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`Name` text(120)
);
--> statement-breakpoint
CREATE TABLE `invoices` (
	`InvoiceId` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`CustomerId` integer NOT NULL,
	`InvoiceDate` numeric NOT NULL,
	`BillingAddress` text(70),
	`BillingCity` text(40),
	`BillingState` text(40),
	`BillingCountry` text(40),
	`BillingPostalCode` text(10),
	`Total` numeric NOT NULL,
	FOREIGN KEY (`CustomerId`) REFERENCES `customers`(`CustomerId`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `IFK_InvoiceCustomerId` ON `invoices` (`CustomerId`);--> statement-breakpoint
CREATE TABLE `invoice_items` (
	`InvoiceLineId` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`InvoiceId` integer NOT NULL,
	`TrackId` integer NOT NULL,
	`UnitPrice` numeric NOT NULL,
	`Quantity` integer NOT NULL,
	FOREIGN KEY (`TrackId`) REFERENCES `tracks`(`TrackId`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`InvoiceId`) REFERENCES `invoices`(`InvoiceId`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `IFK_InvoiceLineTrackId` ON `invoice_items` (`TrackId`);--> statement-breakpoint
CREATE INDEX `IFK_InvoiceLineInvoiceId` ON `invoice_items` (`InvoiceId`);--> statement-breakpoint
CREATE TABLE `media_types` (
	`MediaTypeId` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`Name` text(120)
);
--> statement-breakpoint
CREATE TABLE `playlists` (
	`PlaylistId` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`Name` text(120)
);
--> statement-breakpoint
CREATE TABLE `playlist_track` (
	`PlaylistId` integer NOT NULL,
	`TrackId` integer NOT NULL,
	PRIMARY KEY(`PlaylistId`, `TrackId`),
	FOREIGN KEY (`TrackId`) REFERENCES `tracks`(`TrackId`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`PlaylistId`) REFERENCES `playlists`(`PlaylistId`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `IFK_PlaylistTrackTrackId` ON `playlist_track` (`TrackId`);--> statement-breakpoint
CREATE TABLE `tracks` (
	`TrackId` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`Name` text(200) NOT NULL,
	`AlbumId` integer,
	`MediaTypeId` integer NOT NULL,
	`GenreId` integer,
	`Composer` text(220),
	`Milliseconds` integer NOT NULL,
	`Bytes` integer,
	`UnitPrice` numeric NOT NULL,
	FOREIGN KEY (`MediaTypeId`) REFERENCES `media_types`(`MediaTypeId`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`GenreId`) REFERENCES `genres`(`GenreId`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`AlbumId`) REFERENCES `albums`(`AlbumId`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `IFK_TrackMediaTypeId` ON `tracks` (`MediaTypeId`);--> statement-breakpoint
CREATE INDEX `IFK_TrackGenreId` ON `tracks` (`GenreId`);--> statement-breakpoint
CREATE INDEX `IFK_TrackAlbumId` ON `tracks` (`AlbumId`);--> statement-breakpoint
CREATE TABLE `sqlite_stat1` (

);
--> statement-breakpoint
CREATE VIEW `view1` AS SELECT title FROM albums a;
*/