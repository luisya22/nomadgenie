ALTER TABLE "itinerary_details" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "itinerary_details" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "trip_chat_messages" ADD COLUMN "options" jsonb;--> statement-breakpoint
ALTER TABLE "trip_chat_messages" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "trip_chat_messages" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;