"use client";

import {
  Dispatch,
  Fragment,
  ReactElement,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import UserInfo from "@/components/user-info";
import HomeIcon from "@/components/icons/home-icon";
import Link from "next/link";
import { getAllItems, nextItem, shuffleArray } from "@/app/api/actions";
import Spinner from "@/components/icons/spinner";
import { useSession, signIn, signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

interface AllItems {
  shuffledarray: string[];
  current_index: number;
}

export default function Layout({ children }: { children: ReactElement }) {
  const [allItems, setAllItems] = useState<AllItems | null>(null);

  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const slug = allItems?.shuffledarray[allItems.current_index];
  const quantity = allItems?.shuffledarray.length || 0;

  const itemsLeft = useMemo(() => {
    const currIdx = allItems?.current_index || 0;
    return quantity - currIdx;
  }, [quantity, allItems?.current_index]);

  const withSlug = pathname.includes("pick-random/");

  useEffect(() => {
    if (!withSlug && slug) {
      router.push(`/pick-random/${slug}`);
    }
  }, [slug, withSlug]);

  useEffect(() => {
    if (session?.user?.email) {
      getAllItems(session.user.email)
        .then((res) => {
          setAllItems(res[0]);
        })
        .catch(console.error);
    }
  }, [session?.user?.email]);

  useEffect(() => {
    if (itemsLeft === 0 && session?.user?.email) {
      shuffleArray(session?.user?.email).catch(console.error);
    }
  }, [itemsLeft, session?.user?.email]);

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
            <ShuffleButton setAllItems={setAllItems} />
            <div>{`${itemsLeft} of ${quantity}`}</div>
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
          {allItems && withSlug && (
            <div className={"flex flex-row justify-end mb-8 not-prose"}>
              <NextButton allItems={allItems} setAllItems={setAllItems} />
            </div>
          )}
        </Fragment>
      )}
    </>
  );
}

function ShuffleButton({
  setAllItems,
}: {
  setAllItems: Dispatch<SetStateAction<AllItems | null>>;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { data: session } = useSession();

  const handleClick = async () => {
    if (!session?.user?.email) return;

    setLoading(true);
    try {
      const shuffledArray = await shuffleArray(session.user.email);
      setAllItems({ current_index: 0, shuffledarray: shuffledArray });
      startTransition(() => router.push(`/pick-random/${shuffledArray[0]}`));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
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
  allItems: AllItems;
  setAllItems: Dispatch<SetStateAction<AllItems | null>>;
}) {
  const [loading, setLoading] = useState(false);

  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const { data: session } = useSession();

  const handleClick = async () => {
    if (!session?.user?.email) return;

    setLoading(true);
    try {
      const newIndex = allItems.current_index + 1;
      await nextItem({ currentIndex: newIndex, email: session.user.email });

      startTransition(() => {
        if (allItems.shuffledarray[newIndex]) {
          setAllItems({ ...allItems, current_index: newIndex });
          router.push(`/pick-random/${allItems.shuffledarray[newIndex]}`);
        } else {
          router.push("/");
        }
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
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
