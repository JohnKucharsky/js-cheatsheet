import Menu from "./menu.mdx";
import { Metadata } from "next";
import { signIn } from "@/auth";

export const metadata: Metadata = {
  title: "JS Cheatsheet",
};

export default function Page() {
  return (
    <>
      <form
        action={async () => {
          "use server";
          await signIn("google");
        }}
      >
        <button type="submit">Signin with Google</button>
      </form>
      <Menu />
    </>
  );
}
