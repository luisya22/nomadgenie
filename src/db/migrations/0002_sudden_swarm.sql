ALTER TABLE "itinerary_details" DROP CONSTRAINT "itinerary_details_itinerary_id_trips_id_fk";
--> statement-breakpoint
ALTER TABLE "itinerary_details" ALTER COLUMN "itinerary_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "itinerary_details" ADD CONSTRAINT "itinerary_details_itinerary_id_itineraries_id_fk" FOREIGN KEY ("itinerary_id") REFERENCES "public"."itineraries"("id") ON DELETE cascade ON UPDATE no action;