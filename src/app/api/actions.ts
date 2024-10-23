"use server";
import { auth } from "@/auth";
import { Pool } from "pg";
import { various2Qty } from "@/content/various2";
import { redirect } from "next/navigation";

const client = new Pool();

const shuffleArrayFromQty = (qty: number) => {
  const shuffle = (array: number[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const shuffledArray = Array.from({ length: qty }, (_, i) => i);
  shuffle(shuffledArray);

  return shuffledArray;
};

export async function shuffleArray() {
  const session = await auth();

  const data = await client.query(
    `SELECT id FROM 
    js_cheatsheet WHERE id = $1`,
    [session?.user?.email],
  );

  if (data.rows.length === 0) {
    const shuffledArray = shuffleArrayFromQty(various2Qty);

    await client.query(
      `
    INSERT INTO js_cheatsheet(id, shuffledArray, easyIdsArray)
    VALUES
    ($1, $2, ARRAY[]::int[])`,
      [session?.user?.email, shuffledArray],
    );
  } else {
    const shuffledArray = shuffleArrayFromQty(various2Qty);

    await client.query(
      `UPDATE js_cheatsheet
    SET shuffledArray = $1,
        easyIdsArray = ARRAY[]::int[]
    WHERE id = $2;`,
      [shuffledArray, session?.user?.email],
    );
  }

  redirect("/pick-random");
}

export async function getFirstItem(): Promise<
  Record<"shuff_num", number | null>[]
> {
  const session = await auth();

  const res = await client.query(
    `SELECT shuffledArray[array_length(shuffledArray, 1)] as shuff_num FROM js_cheatsheet
        WHERE id = $1`,
    [session?.user?.email],
  );

  return res.rows;
}

export async function nextItem() {
  const session = await auth();

  const res = await client.query(
    `UPDATE js_cheatsheet
    SET shuffledArray = 
    array_remove(shuffledArray, shuffledArray[array_length(shuffledArray, 1)])
    WHERE id = $1 returning shuffledArray[array_length(shuffledArray, 1)] as shuff_num`,
    [session?.user?.email],
  );

  if (res.rows[0]?.shuff_num !== undefined && res.rows[0].shuff_num !== null) {
    redirect(`/pick-random/${res.rows[0].shuff_num}`);
  } else {
    redirect(`/pick-random`);
  }
}
