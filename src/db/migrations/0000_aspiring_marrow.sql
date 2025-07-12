CREATE TABLE "itineraries" (
	"id" serial PRIMARY KEY NOT NULL,
	"trip_id" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "itinerary_details" (
	"id" serial PRIMARY KEY NOT NULL,
	"itinerary_id" integer,
	"type" varchar NOT NULL,
	"name" varchar NOT NULL,
	"place" varchar NOT NULL,
	"description" varchar NOT NULL,
	"time" varchar NOT NULL,
	"aprox_time" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "trips" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"city" varchar NOT NULL,
	"country" varchar NOT NULL,
	"from_date" date NOT NULL,
	"to_date" date NOT NULL,
	"budget" varchar NOT NULL,
	"selectedActivities" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"status" varchar DEFAULT 'PROCESSING' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "itineraries" ADD CONSTRAINT "itineraries_trip_id_trips_id_fk" FOREIGN KEY ("trip_id") REFERENCES "public"."trips"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "itinerary_details" ADD CONSTRAINT "itinerary_details_itinerary_id_trips_id_fk" FOREIGN KEY ("itinerary_id") REFERENCES "public"."trips"("id") ON DELETE cascade ON UPDATE no action;