import { users } from "@/db/schema";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

// Expo syntax for creating API routes
export async function POST(request: Request) {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    if (!sql) throw new Error("Error connecting to the database!");

    const db = drizzle(sql);
    if (!db) throw new Error("Error connecting DB to Drizzle ORM!");

    const { name, email, clerkId } = await request.json();
    if (!name || !email || !clerkId)
      throw new Error(
        "Clerk User Credentials Could Not be Found. User Not Logged In!"
      );

    const newUser = {
      name,
      email,
      clerk_id: clerkId,
    };
    await db.insert(users).values(newUser);

    return new Response(
      JSON.stringify({ data: newUser, message: "User inserted successfully" }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error:any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
