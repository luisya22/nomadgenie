CREATE TABLE "trips" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"city" varchar NOT NULL,
	"country" varchar NOT NULL,
	"from_date" date NOT NULL,
	"to_date" date NOT NULL,
	"budget" varchar NOT NULL,
	"selectedActivities" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
