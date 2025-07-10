import { date, pgTable, varchar, serial, timestamp, jsonb } from "drizzle-orm/pg-core";

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

export type Trip = typeof trips.$inferSelect;
export type NewTrip = typeof trips.$inferInsert;
