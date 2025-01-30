/*import { Client } from "postgres";

const client = new Client({
  user: "usuarioppto",
  database: "bdppto",
  hostname: "localhost",
  port: 5432,
  password: "ppto1234",
});

export async function connectDB() {
  try {
    await client.connect();
    console.log("Database connected successfully!");
  } catch (err) {
    console.error("Connection error:", err);
  }
  return client;
}
*/

// db/connection.ts
import { Client } from "postgres";
import { load } from "https://deno.land/std/dotenv/mod.ts";

const env = await load();
const databaseUrl = env["DATABASE_URL"] || Deno.env.get("DATABASE_URL");

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
