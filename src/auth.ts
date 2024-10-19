import NextAuth from "next-auth";
import Google from "@auth/core/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
});