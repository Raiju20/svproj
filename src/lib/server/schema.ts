import { sqliteTable, text, index, foreignKey, integer, numeric, primaryKey, sqliteView } from "drizzle-orm/sqlite-core"
  import { sql } from "drizzle-orm"

//!! https://orm.drizzle.team/docs/latest-releases/drizzle-orm-v0283#-added-tableinferselect--table_inferselect-and-tableinferinsert--table_inferinsert-for-more-convenient-table-model-type-inference
import type { InferSelectModel } from "drizzle-orm";
//Drizzle формирует TS-интерфейсы автоматом. см. onetable
export type Question = InferSelectModel<typeof artists>;

export type Album = InferSelectModel<typeof albums>;
export type ArtWithAlbums =Question & {albums:Album[]}
//!!
import { relations } from 'drizzle-orm';

export const albums = sqliteTable("albums", {
	albumId: integer("AlbumId").primaryKey({ autoIncrement: true }).notNull(),
	title: text("Title", { length: 160 }).notNull(),
	artistId: integer("ArtistId").notNull().references(() => artists.artistId),
},
(table) => [
	index("IFK_AlbumArtistId").on(table.artistId),
]);

export const artists = sqliteTable("artists", {
	artistId: integer("ArtistId").primaryKey({ autoIncrement: true }).notNull(),
	name: text("Name", { length: 120 }),
});

export const customers = sqliteTable("customers", {
	customerId: integer("CustomerId").primaryKey({ autoIncrement: true }).notNull(),
	firstName: text("FirstName", { length: 40 }).notNull(),
	lastName: text("LastName", { length: 20 }).notNull(),
	company: text("Company", { length: 80 }),
	address: text("Address", { length: 70 }),
	city: text("City", { length: 40 }),
	state: text("State", { length: 40 }),
	country: text("Country", { length: 40 }),
	postalCode: text("PostalCode", { length: 10 }),
	phone: text("Phone", { length: 24 }),
	fax: text("Fax", { length: 24 }),
	email: text("Email", { length: 60 }).notNull(),
	supportRepId: integer("SupportRepId").references(() => employees.employeeId),
},
(table) => [
	index("IFK_CustomerSupportRepId").on(table.supportRepId),
]);

export const employees = sqliteTable("employees", {
	employeeId: integer("EmployeeId").primaryKey({ autoIncrement: true }).notNull(),
	lastName: text("LastName", { length: 20 }).notNull(),
	firstName: text("FirstName", { length: 20 }).notNull(),
	title: text("Title", { length: 30 }),
	reportsTo: integer("ReportsTo"),
	birthDate: numeric("BirthDate"),
	hireDate: numeric("HireDate"),
	address: text("Address", { length: 70 }),
	city: text("City", { length: 40 }),
	state: text("State", { length: 40 }),
	country: text("Country", { length: 40 }),
	postalCode: text("PostalCode", { length: 10 }),
	phone: text("Phone", { length: 24 }),
	fax: text("Fax", { length: 24 }),
	email: text("Email", { length: 60 }),
},
(table) => [
	index("IFK_EmployeeReportsTo").on(table.reportsTo),
	foreignKey(() => ({
			columns: [table.reportsTo],
			foreignColumns: [table.employeeId],
			name: "employees_ReportsTo_employees_EmployeeId_fk"
		})),
]);

export const genres = sqliteTable("genres", {
	genreId: integer("GenreId").primaryKey({ autoIncrement: true }).notNull(),
	name: text("Name", { length: 120 }),
});

export const invoices = sqliteTable("invoices", {
	invoiceId: integer("InvoiceId").primaryKey({ autoIncrement: true }).notNull(),
	customerId: integer("CustomerId").notNull().references(() => customers.customerId),
	invoiceDate: numeric("InvoiceDate").notNull(),
	billingAddress: text("BillingAddress", { length: 70 }),
	billingCity: text("BillingCity", { length: 40 }),
	billingState: text("BillingState", { length: 40 }),
	billingCountry: text("BillingCountry", { length: 40 }),
	billingPostalCode: text("BillingPostalCode", { length: 10 }),
	total: numeric("Total").notNull(),
},
(table) => [
	index("IFK_InvoiceCustomerId").on(table.customerId),
]);

export const invoiceItems = sqliteTable("invoice_items", {
	invoiceLineId: integer("InvoiceLineId").primaryKey({ autoIncrement: true }).notNull(),
	invoiceId: integer("InvoiceId").notNull().references(() => invoices.invoiceId),
	trackId: integer("TrackId").notNull().references(() => tracks.trackId),
	unitPrice: numeric("UnitPrice").notNull(),
	quantity: integer("Quantity").notNull(),
},
(table) => [
	index("IFK_InvoiceLineTrackId").on(table.trackId),
	index("IFK_InvoiceLineInvoiceId").on(table.invoiceId),
]);

export const mediaTypes = sqliteTable("media_types", {
	mediaTypeId: integer("MediaTypeId").primaryKey({ autoIncrement: true }).notNull(),
	name: text("Name", { length: 120 }),
});

export const playlists = sqliteTable("playlists", {
	playlistId: integer("PlaylistId").primaryKey({ autoIncrement: true }).notNull(),
	name: text("Name", { length: 120 }),
});

export const playlistTrack = sqliteTable("playlist_track", {
	playlistId: integer("PlaylistId").notNull().references(() => playlists.playlistId),
	trackId: integer("TrackId").notNull().references(() => tracks.trackId),
},
(table) => [
	index("IFK_PlaylistTrackTrackId").on(table.trackId),
	primaryKey({ columns: [table.playlistId, table.trackId], name: "playlist_track_PlaylistId_TrackId_pk"})
]);

export const tracks = sqliteTable("tracks", {
	trackId: integer("TrackId").primaryKey({ autoIncrement: true }).notNull(),
	name: text("Name", { length: 200 }).notNull(),
	albumId: integer("AlbumId").references(() => albums.albumId),
	mediaTypeId: integer("MediaTypeId").notNull().references(() => mediaTypes.mediaTypeId),
	genreId: integer("GenreId").references(() => genres.genreId),
	composer: text("Composer", { length: 220 }),
	milliseconds: integer("Milliseconds").notNull(),
	bytes: integer("Bytes"),
	unitPrice: numeric("UnitPrice").notNull(),
},
(table) => [
	index("IFK_TrackMediaTypeId").on(table.mediaTypeId),
	index("IFK_TrackGenreId").on(table.genreId),
	index("IFK_TrackAlbumId").on(table.albumId),
]);

export const sqliteStat1 = sqliteTable("sqlite_stat1", {
});

export const view1 = sqliteView("view1", {
	title: text("Title", { length: 160 }),
}).as(sql`SELECT title FROM albums a`);