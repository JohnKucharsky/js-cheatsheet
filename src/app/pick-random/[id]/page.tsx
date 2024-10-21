import { various2, variousQty } from "@/content/various2";
import { notFound, redirect } from "next/navigation";
import { popNum } from "@/app/api/globalShuffledArray";
import { nextItem } from "@/app/api/actions";

export async function generateStaticParams() {
  return Array(variousQty)
    .fill(0)
    .map((_, idx) => ({ id: String(idx) }));
}

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  if (Number(params.id) >= variousQty) {
    notFound();
  }

  const Content = various2[Number(params.id)];

  return (
    <>
      <Content />
      <div className={"flex flex-row gap-8 items-center"}>
        <form
          action={async () => {
            "use server";
            const pageNum = popNum();
            if (pageNum !== undefined) {
              await nextItem();
              redirect(`/pick-random/${pageNum}`);
            } else {
              redirect(`/pick-random`);
            }
          }}
        >
          <button className={"text-white"} type="submit">
            next
          </button>
        </form>
      </div>
    </>
  );
}
