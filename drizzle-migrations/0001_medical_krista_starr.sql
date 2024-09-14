CREATE TABLE IF NOT EXISTS "drivers" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" varchar(50) NOT NULL,
	"last_name" varchar(50) NOT NULL,
	"profile_image_url" text,
	"car_image_url" text,
	"car_seats" integer NOT NULL,
	"rating" numeric(3, 2)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "rides" (
	"ride_id" serial PRIMARY KEY NOT NULL,
	"origin_address" varchar(255) NOT NULL,
	"destination_address" varchar(255) NOT NULL,
	"origin_latitude" numeric(9, 6) NOT NULL,
	"origin_longitude" numeric(9, 6) NOT NULL,
	"destination_latitude" numeric(9, 6) NOT NULL,
	"destination_longitude" numeric(9, 6) NOT NULL,
	"ride_time" integer NOT NULL,
	"fare_price" numeric(10, 2) NOT NULL,
	"payment_status" varchar(20) NOT NULL,
	"driver_id" integer,
	"user_id" varchar(100) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "rides" ADD CONSTRAINT "rides_driver_id_drivers_id_fk" FOREIGN KEY ("driver_id") REFERENCES "public"."drivers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
