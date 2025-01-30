import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { connectDB } from "../db/connection.ts";
import * as bcrypt from "bcrypt";

export default function Main() {
  return (
    <>
      <Head>
        <title>Menu Principal</title>
      </Head>
    </>
  );
}
