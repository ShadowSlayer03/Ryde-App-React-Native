import { desc, eq } from "drizzle-orm";
import { drivers, rides } from "@/db/schema";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

export async function GET(request: Request, { id }: { id: string }) {
  if (!id) {
    return new Response(JSON.stringify({ error: "Missing Required Fields!" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const sql = neon(process.env.DATABASE_URL!);
    if (!sql) throw new Error("Error connecting to the database!");

    const db = drizzle(sql);
    if (!db) throw new Error("Error connecting DB to Drizzle ORM!");

    // Fetch the rides and their associated driver data
    const response = await db
      .select({
        ride_id: rides.ride_id,
        origin_address: rides.origin_address,
        destination_address: rides.destination_address,
        origin_latitude: rides.origin_latitude,
        origin_longitude: rides.origin_longitude,
        destination_latitude: rides.destination_latitude,
        destination_longitude: rides.destination_longitude,
        ride_time: rides.ride_time,
        fare_price: rides.fare_price,
        payment_status: rides.payment_status,
        created_at: rides.created_at,
        driver_id: drivers.id,
        first_name: drivers.first_name,
        last_name: drivers.last_name,
        profile_image_url: drivers.profile_image_url,
        car_image_url: drivers.car_image_url,
        car_seats: drivers.car_seats,
        rating: drivers.rating,
      })
      .from(rides)
      .innerJoin(drivers, eq(rides.driver_id, drivers.id))
      .where(eq(rides.user_id, id))
      .orderBy(desc(rides.created_at));

    // Format the response data manually
    const formattedResponse = response.map((ride) => ({
      ride_id: ride.ride_id,
      origin_address: ride.origin_address,
      destination_address: ride.destination_address,
      origin_latitude: ride.origin_latitude,
      origin_longitude: ride.origin_longitude,
      destination_latitude: ride.destination_latitude,
      destination_longitude: ride.destination_longitude,
      ride_time: ride.ride_time,
      fare_price: ride.fare_price,
      payment_status: ride.payment_status,
      created_at: ride.created_at,
      driver: {
        driver_id: ride.driver_id,
        first_name: ride.first_name,
        last_name: ride.last_name,
        profile_image_url: ride.profile_image_url,
        car_image_url: ride.car_image_url,
        car_seats: ride.car_seats,
        rating: ride.rating,
      },
    }));

    console.log("Response from [id]+api.ts", formattedResponse);
    return new Response(JSON.stringify({ data: formattedResponse }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching recent rides:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error!" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
