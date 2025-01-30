import { Client } from "postgres";

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
