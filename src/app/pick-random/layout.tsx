import { ReactElement, Suspense } from "react";
import { auth, signIn, signOut } from "@/auth";
import UserInfo from "@/components/user-info";
import ShuffleButton from "@/components/shuffle-button";

export default async function Layout({ children }: { children: ReactElement }) {
  const session = await auth();

  return (
    <>
      <div
        className={
          "flex flex-col-reverse md:flex-row gap-4 items-start md:items-center justify-between"
        }
      >
        {Boolean(session) && (
          <div className="flex items-center gap-4">
            <ShuffleButton />
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
        <Suspense fallback={"waiting..."}>{children}</Suspense>
      )}
    </>
  );
}
