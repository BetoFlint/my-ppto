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

    const client = await connectDB();
    const result = await client.queryObject`
      SELECT * FROM users WHERE email = ${email}
    `;

    if (result.rows.length === 0) {
      return new Response("Usuario no encontrado", { status: 401 });
    }

    const user = result.rows[0];
    // Verificar la contraseña contra el hash almacenado
    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      return new Response("Contraseña incorrecta", { status: 401 });
    }

    // Aquí implementarías la lógica de sesión
    return new Response("", {
      status: 302,
      headers: { Location: "/main" },
    });
  },
};

export default function Login() {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        <h1 class="text-2xl font-bold">Login</h1>
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
            Login
          </button>
        </form>
      </div>
    </>
  );
}
