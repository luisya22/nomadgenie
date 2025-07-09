import { date, pgTable, varchar, serial } from "drizzle-orm/pg-core";

export const trips = pgTable("trips", {
    id: serial("id").primaryKey(),
    userId: varchar("user_id").notNull(),
    fromDate: date("from_date"),
    toDate: date("to_date")
});

export type Trip = typeof trips.$inferSelect;
export type NewTrip = typeof trips.$inferInsert;
