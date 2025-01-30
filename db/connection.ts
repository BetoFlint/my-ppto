import { Client } from "postgres";
import { load } from "https://deno.land/std/dotenv/mod.ts";

const env = await load();
const databaseUrl = env["DATABASE_URL"] || Deno.env.get("DATABASE_URL");

if (!databaseUrl) {
  throw new Error(
    "DATABASE_URL is not defined in the .env file or environment variables."
  );
}

const client = new Client(databaseUrl);

export async function connectDB() {
  try {
    await client.connect();
    console.log("Database connected successfully!");
  } catch (err) {
    console.error("Connection error:", err);
  }
  return client;
}

// Puedes exportar otras funciones también si es necesario
