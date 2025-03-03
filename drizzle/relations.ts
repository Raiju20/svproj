import { relations } from "drizzle-orm/relations";
import { artists, albums, employees, customers, invoices, tracks, invoiceItems, playlistTrack, playlists, mediaTypes, genres } from "./schema";

export const albumsRelations = relations(albums, ({one, many}) => ({
	artist: one(artists, {
		fields: [albums.artistId],
		references: [artists.artistId]
	}),
	tracks: many(tracks),
}));

export const artistsRelations = relations(artists, ({many}) => ({
	albums: many(albums),
}));

export const customersRelations = relations(customers, ({one, many}) => ({
	employee: one(employees, {
		fields: [customers.supportRepId],
		references: [employees.employeeId]
	}),
	invoices: many(invoices),
}));

export const employeesRelations = relations(employees, ({one, many}) => ({
	customers: many(customers),
	employee: one(employees, {
		fields: [employees.reportsTo],
		references: [employees.employeeId],
		relationName: "employees_reportsTo_employees_employeeId"
	}),
	employees: many(employees, {
		relationName: "employees_reportsTo_employees_employeeId"
	}),
}));

export const invoicesRelations = relations(invoices, ({one, many}) => ({
	customer: one(customers, {
		fields: [invoices.customerId],
		references: [customers.customerId]
	}),
	invoiceItems: many(invoiceItems),
}));

export const invoiceItemsRelations = relations(invoiceItems, ({one}) => ({
	track: one(tracks, {
		fields: [invoiceItems.trackId],
		references: [tracks.trackId]
	}),
	invoice: one(invoices, {
		fields: [invoiceItems.invoiceId],
		references: [invoices.invoiceId]
	}),
}));

export const tracksRelations = relations(tracks, ({one, many}) => ({
	invoiceItems: many(invoiceItems),
	playlistTracks: many(playlistTrack),
	mediaType: one(mediaTypes, {
		fields: [tracks.mediaTypeId],
		references: [mediaTypes.mediaTypeId]
	}),
	genre: one(genres, {
		fields: [tracks.genreId],
		references: [genres.genreId]
	}),
	album: one(albums, {
		fields: [tracks.albumId],
		references: [albums.albumId]
	}),
}));

export const playlistTrackRelations = relations(playlistTrack, ({one}) => ({
	track: one(tracks, {
		fields: [playlistTrack.trackId],
		references: [tracks.trackId]
	}),
	playlist: one(playlists, {
		fields: [playlistTrack.playlistId],
		references: [playlists.playlistId]
	}),
}));

export const playlistsRelations = relations(playlists, ({many}) => ({
	playlistTracks: many(playlistTrack),
}));

export const mediaTypesRelations = relations(mediaTypes, ({many}) => ({
	tracks: many(tracks),
}));

export const genresRelations = relations(genres, ({many}) => ({
	tracks: many(tracks),
}));