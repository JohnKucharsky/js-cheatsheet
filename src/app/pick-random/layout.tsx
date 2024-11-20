import { ReactElement, Suspense } from "react";
import { auth, signIn, signOut } from "@/auth";
import UserInfo from "@/components/user-info";
import ShuffleButton from "@/components/shuffle-button";
import { itemsLeftInList } from "@/app/api/actions";
import Spinner from "@/components/spinner";
import HomeIcon from "@/components/home-icon";
import Link from "next/link";
import { getAllFilesNames } from "@/get-mdx-components";

export default async function Layout({ children }: { children: ReactElement }) {
  const session = await auth();
  const count = await itemsLeftInList();
  const allFiles = getAllFilesNames();
  const quantity = allFiles.length;

  return (
    <>
      <div
        className={
          "flex flex-col-reverse md:flex-row gap-4 items-start md:items-center justify-between"
        }
      >
        {Boolean(session) && (
          <div className="flex items-center gap-4">
            <Link href={"/"} style={{ borderBottom: "none" }}>
              <HomeIcon />
            </Link>
            <ShuffleButton />
            <div>{`${count || "none"} of ${quantity}`}</div>
          </div>
        )}
        <div className={"flex gap-4 items-start"}>
          {session ? (
            <UserInfo
              userName={session.user?.name}
              imgSrc={session.user?.image}
              email={session.user?.email}
            >
              <form
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <button className={"text-white"} type="submit">
                  sign out
                </button>
              </form>
            </UserInfo>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("google");
              }}
            >
              <button className={"text-white"} type="submit">
                sign in with Google
              </button>
            </form>
          )}
        </div>
      </div>

      {Boolean(session) && (
        <Suspense fallback={<Spinner />}>{children}</Suspense>
      )}
    </>
  );
}
