CREATE TABLE "trip_chat_messages" (
	"id" serial PRIMARY KEY NOT NULL,
	"trip_id" integer NOT NULL,
	"role" varchar NOT NULL,
	"content" text NOT NULL,
	"status" varchar DEFAULT 'completed' NOT NULL
);
--> statement-breakpoint
ALTER TABLE "trip_chat_messages" ADD CONSTRAINT "trip_chat_messages_trip_id_trips_id_fk" FOREIGN KEY ("trip_id") REFERENCES "public"."trips"("id") ON DELETE cascade ON UPDATE no action;