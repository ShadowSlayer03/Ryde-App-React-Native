import { drivers } from "@/db/schema";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

export async function GET() {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    if (!sql) throw new Error("Error connecting to the database!");

    const db = drizzle(sql);
    if (!db) throw new Error("Error connecting DB to Drizzle ORM!");

    const driverRecords = await db.select().from(drivers);

    //console.log("Drivers from the Database:", driverRecords);

    return new Response(
      JSON.stringify({ data: driverRecords, status: 200 }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("Error fetching drivers:", error);
    return new Response(JSON.stringify({ error: error.message, status: 500 }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
