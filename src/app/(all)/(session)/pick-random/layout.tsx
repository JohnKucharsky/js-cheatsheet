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
import UserInfo from "@/components/user-info";
import HomeIcon from "@/components/icons/home-icon";
import Link from "next/link";
import Spinner from "@/components/icons/spinner";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  getCurrentItem,
  getTotalItems,
  initializeShuffledItems,
  moveToNextItem,
} from "@/app/api/actions";

export default function Layout({ children }: { children: ReactElement }) {
  const [currentItem, setCurrentItem] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [itemsDone, setItemsDone] = useState<number>(0);

  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (session?.user?.email) {
        const total = await getTotalItems();
        setTotalCount(total);
        const current = await getCurrentItem(session?.user?.email || "");

        if (current.currentState !== total) {
          setCurrentItem(current.currentItem);
          setItemsDone(current.currentState);
          router.push(`/pick-random/${current.currentItem}`);
        } else {
          await initializeShuffledItems(session?.user?.email || "");
          const current = await getCurrentItem(session?.user?.email || "");
          setCurrentItem(current.currentItem);
          setItemsDone(current.currentState);
          router.push(`/pick-random/${current.currentItem}`);
        }
      }
    })();
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
            <ShuffleButton setItemsLeft={setItemsDone} />
            <div>{`${itemsDone + 1} of ${totalCount}`}</div>
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

          {currentItem && (
            <div className={"flex flex-row justify-end mb-8 not-prose"}>
              <NextButton setItemsLeft={setItemsDone} total={totalCount} />
            </div>
          )}
        </Fragment>
      )}
    </>
  );
}

function ShuffleButton({
  setItemsLeft,
}: {
  setItemsLeft: Dispatch<SetStateAction<number>>;
}) {
  const { data: session } = useSession();
  const [loading, setLoading] = useState<boolean>(false);

  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleClick = async () => {
    if (!session?.user?.email) return;

    setLoading(true);
    try {
      await initializeShuffledItems(session.user.email);
      const res = await getCurrentItem(session.user.email);

      setItemsLeft(res.currentState);
      startTransition(() => router.push(`/pick-random/${res.currentItem}`));
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
  setItemsLeft,
  total,
}: {
  setItemsLeft: Dispatch<SetStateAction<number>>;
  total: number;
}) {
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const { data: session } = useSession();

  const handleClick = async () => {
    if (!session?.user?.email) return;

    setLoading(true);
    try {
      await moveToNextItem(session.user.email);
      const current = await getCurrentItem(session?.user?.email || "");

      if (current.currentState !== total) {
        setItemsLeft(current.currentState);
        startTransition(() =>
          router.push(`/pick-random/${current.currentItem}`),
        );
      } else {
        await initializeShuffledItems(session?.user?.email || "");
        const current = await getCurrentItem(session?.user?.email || "");
        setItemsLeft(current.currentState);
        startTransition(() =>
          router.push(`/pick-random/${current.currentItem}`),
        );
      }
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
