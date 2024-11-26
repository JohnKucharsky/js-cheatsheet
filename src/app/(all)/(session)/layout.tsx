import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

export default function Layout({ children }: { children: ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
