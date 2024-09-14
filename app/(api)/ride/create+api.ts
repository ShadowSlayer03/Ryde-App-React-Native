import { rides } from "@/db/schema";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      origin_address,
      destination_address,
      origin_latitude,
      origin_longitude,
      destination_latitude,
      destination_longitude,
      ride_time,
      fare_price,
      payment_status,
      driver_id,
      user_id,
    } = body;

    // Validation: Check for missing required fields
    if (
      !origin_address ||
      !destination_address ||
      !origin_latitude ||
      !origin_longitude ||
      !destination_latitude ||
      !destination_longitude ||
      !ride_time ||
      !fare_price ||
      !payment_status ||
      !driver_id ||
      !user_id
    ) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }

    const sql = neon(process.env.DATABASE_URL!);
    if (!sql) throw new Error("Error connecting to the database!");

    const db = drizzle(sql);
    if (!db) throw new Error("Error connecting DB to Drizzle ORM!");

    const insertedRide = await db
      .insert(rides)
      .values({
        origin_address,
        destination_address,
        origin_latitude,
        origin_longitude,
        destination_latitude,
        destination_longitude,
        ride_time,
        fare_price,
        payment_status,
        driver_id,
        user_id,
      })
      .returning();

      console.log("New Ride Created!",insertedRide);
      
    return new Response(JSON.stringify({ data: insertedRide[0] }), {
      status: 201,
    });
  } catch (error) {
    console.error("Error inserting data into rides:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
