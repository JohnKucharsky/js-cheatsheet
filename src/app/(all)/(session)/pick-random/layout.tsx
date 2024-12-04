"use client";

import {
  Dispatch,
  Fragment,
  ReactElement,
  SetStateAction,
  useEffect,
  useState,
  useTransition,
} from "react";
import { signIn, signOut } from "@/auth";
import UserInfo from "@/components/user-info";
import HomeIcon from "@/components/icons/home-icon";
import Link from "next/link";
import { getAllItems, nextItem, shuffleArray } from "@/app/api/actions";
import Spinner from "@/components/icons/spinner";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

export default function Layout({ children }: { children: ReactElement }) {
  const [allItems, setAllItems] = useState<{
    shuffledarray: string[];
    current_index: number;
  } | null>(null);

  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const slug = allItems?.shuffledarray[allItems.current_index];
  const quantity = allItems?.shuffledarray.length || 0;

  const itemsLeft = () => {
    const currIdx = allItems?.current_index || 0;
    return quantity - currIdx;
  };

  const withSlug = pathname.includes("pick-random/");

  useEffect(() => {
    if (!withSlug && slug) {
      router.push(`/pick-random/${slug}`);
    }
  }, [slug, pathname]);

  useEffect(() => {
    if (session?.user?.email) {
      getAllItems(session.user.email)
        .then((res) => {
          setAllItems(res[0]);
        })
        .catch(console.error);
    }
  }, [session?.user?.email]);

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
            <ShuffleButton
              email={session?.user?.email}
              setAllItems={setAllItems}
            />
            <div>{`${itemsLeft() || "..."} of ${quantity}`}</div>
          </div>
        )}
        <div className={"flex gap-4 items-start"}>
          {session ? (
            <UserInfo
              userName={session.user?.name}
              imgSrc={session.user?.image}
              email={session.user?.email}
            >
              <button className={"text-white"} onClick={() => signOut()}>
                sign out
              </button>
            </UserInfo>
          ) : (
            <>
              {status === "unauthenticated" ? (
                <button
                  className={"text-white"}
                  onClick={() => signIn("google")}
                >
                  sign in with Google
                </button>
              ) : (
                <Spinner />
              )}
            </>
          )}
        </div>
      </div>

      {Boolean(session) && (
        <Fragment>
          {children}
          <div className={"flex flex-row justify-end"}>
            {allItems && withSlug && (
              <NextButton allItems={allItems} setAllItems={setAllItems} />
            )}
          </div>
        </Fragment>
      )}
    </>
  );
}

function ShuffleButton({
  email,
  setAllItems,
}: {
  email: string | null | undefined;
  setAllItems: Dispatch<
    SetStateAction<{
      shuffledarray: string[];
      current_index: number;
    } | null>
  >;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleClick = async () => {
    setLoading(true);
    const shuffledArray = await shuffleArray(email);
    setAllItems({ current_index: 0, shuffledarray: shuffledArray });
    setLoading(false);

    startTransition(() => router.push(`/pick-random/${shuffledArray[0]}`));
  };

  return (
    <button
      disabled={loading || isPending}
      onClick={handleClick}
      className={"text-white"}
    >
      {loading || isPending ? <Spinner /> : "shuffle"}
    </button>
  );
}

function NextButton({
  allItems,
  setAllItems,
}: {
  allItems: {
    shuffledarray: string[];
    current_index: number;
  };
  setAllItems: Dispatch<
    SetStateAction<{
      shuffledarray: string[];
      current_index: number;
    } | null>
  >;
}) {
  const [loading, setLoading] = useState(false);

  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const { data: session } = useSession();

  const handleClick = async () => {
    setLoading(true);
    await nextItem({
      currentIndex: allItems.current_index + 1,
      email: session?.user?.email,
    }).catch(console.error);
    setLoading(false);

    if (allItems.shuffledarray[allItems.current_index + 1]) {
      startTransition(() => {
        setAllItems({ ...allItems, current_index: allItems.current_index + 1 });
        router.push(
          `/pick-random/${allItems.shuffledarray[allItems.current_index + 1]}`,
        );
      });
    } else {
      startTransition(() => router.push("/"));
    }
  };

  return (
    <button
      disabled={isPending || loading}
      onClick={handleClick}
      className={"text-white"}
    >
      {isPending || loading ? <Spinner /> : "next"}
    </button>
  );
}
