import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { connectDB } from "../db/connection.ts";
import * as bcrypt from "bcrypt";

export const handler: Handlers = {
  async POST(req, ctx) {
    const form = await req.formData();
    const email = form.get("email")?.toString();
    const password = form.get("password")?.toString();

    if (!email || !password) {
      return new Response("Email y password son requeridos", { status: 400 });
    }

    // Crear el hash de la contraseña
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const client = await connectDB();
    try {
      const result = await client.queryObject`
        INSERT INTO users (email, password_hash)
        VALUES (${email}, ${password_hash})
        RETURNING id
      `;

      return new Response("", {
        status: 302,
        headers: { Location: "/login" },
      });
    } catch (err) {
      console.error("Error registering user:", err);
      return new Response("Error al registrar usuario", { status: 500 });
    }
  },
};

export default function Register() {
  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        <h1 class="text-2xl font-bold">Register</h1>
        <form method="POST" class="mt-4">
          <div class="mb-4">
            <label class="block">Email:</label>
            <input
              type="email"
              name="email"
              class="border p-2 w-full"
              required
            />
          </div>
          <div class="mb-4">
            <label class="block">Password:</label>
            <input
              type="password"
              name="password"
              class="border p-2 w-full"
              required
            />
          </div>
          <button
            type="submit"
            class="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Register
          </button>
        </form>
      </div>
    </>
  );
}
