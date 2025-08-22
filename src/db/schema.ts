import { relations } from "drizzle-orm";
import { date, pgTable, varchar, serial, timestamp, jsonb, integer, text } from "drizzle-orm/pg-core";

//TODO: Change selectedActivities to selected_activities

// TRIPS
export const trips = pgTable("trips", {
    id: serial("id").primaryKey(),
    userId: varchar("user_id").notNull(),
    city: varchar("city").notNull(),
    country: varchar("country").notNull(),
    fromDate: date("from_date").notNull(),
    toDate: date("to_date").notNull(),
    budget: varchar("budget").notNull(),
    selectedActivities: jsonb('selectedActivities').$type<string[]>().default([]).notNull(),
    status: varchar("status").default('PROCESSING').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().$onUpdate(() => new Date()).notNull(),
});

export const tripRelations = relations(trips, ({many}) => ({
        itineraries: many(itineraries),
    })
);

export type Trip = typeof trips.$inferSelect;
export type NewTrip = typeof trips.$inferInsert;

// ITINERARIES
export const itineraries = pgTable("itineraries", {
    id: serial("id").primaryKey(),
    tripId: integer('trip_id').references(() => trips.id, {onDelete: 'cascade'}),
    date: date("date").notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().$onUpdate(() => new Date()).notNull()
});

export const itinerariesRelations = relations(itineraries, ({ one, many }) => ({
    trip: one(trips, {
        fields: [itineraries.tripId],
        references: [trips.id]
    }),
    details: many(itineraryDetails)
}));

export type Itinerary = typeof itineraries.$inferSelect;
export type NewItinerary = typeof itineraries.$inferInsert;


// ITINERARY_DETAILS
export const itineraryDetails = pgTable("itinerary_details", {
    id: serial("id").primaryKey(),
    itineraryId: integer('itinerary_id').references(() => itineraries.id, {onDelete: 'cascade'}).notNull(),
    type: varchar('type').notNull(),
    name: varchar('name').notNull(),
    place: varchar('place').notNull(),
    description: varchar('description').notNull(),
    time: varchar('time').notNull(),
    aproxTime: varchar('aprox_time').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().$onUpdate(() => new Date()).notNull()

});

export const itineraryDetailsRelations = relations(itineraryDetails, ({ one }) => ({
    itinerary: one(itineraries, {
        fields: [itineraryDetails.itineraryId],
        references: [itineraries.id]
    }),
}));

export type ItineraryDetails = typeof itineraryDetails.$inferSelect;
export type NewItineraryDetails = typeof itineraryDetails.$inferInsert;



export const tripChatMessages = pgTable("trip_chat_messages", {
    id: serial("id").primaryKey(),
    tripId: integer('trip_id').references(() => trips.id, {onDelete: 'cascade'}).notNull(),
    role: varchar("role").notNull(), 
    content: text("content").notNull(),
    status:  varchar("status").notNull().default("completed"),
    options: jsonb().$type<{
        type: string,
        name: string,
        place: string,
        description: string
    }[]>().default([]),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().$onUpdate(() => new Date()).notNull()
});

export const tripChatMessagesRelations = relations(tripChatMessages, ({ one }) => ({
    trip: one(trips, {
        fields: [tripChatMessages.tripId],
        references: [trips.id]
    })
}));

export type TripChatMessage = typeof tripChatMessages.$inferSelect;
export type NewTripChatMessage = typeof tripChatMessages.$inferInsert;
