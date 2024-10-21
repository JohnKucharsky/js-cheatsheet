"use server";
import { auth } from "@/auth";
import { Pool } from "pg";

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

export async function shuffleArray(qty: number) {
  const session = await auth();

  const data = await client.query(
    `SELECT id FROM 
    js_cheatsheet WHERE id = $1`,
    [session?.user?.email],
  );

  if (data.rows.length === 0) {
    const shuffledArray = shuffleArrayFromQty(qty);

    await client.query(
      `
    INSERT INTO js_cheatsheet(id, shuffledArray, easyIdsArray)
    VALUES
    ($1, $2, ARRAY[]::int[])`,
      [session?.user?.email, shuffledArray],
    );
  } else {
    const shuffledArray = shuffleArrayFromQty(qty);

    await client.query(
      `UPDATE js_cheatsheet
    SET shuffledArray = $1,
        easyIdsArray = ARRAY[]::int[]
    WHERE id = $2;`,
      [shuffledArray, session?.user?.email],
    );
  }
}

export async function getShuffledArray(): Promise<
  Record<"shuffledarray", number[]>[]
> {
  const session = await auth();

  const res = await client.query(
    `SELECT shuffledArray FROM js_cheatsheet
        WHERE id = $1`,
    [session?.user?.email],
  );

  return res.rows;
}

export async function nextItem() {
  const session = await auth();

  await client.query(
    `UPDATE js_cheatsheet
    SET shuffledArray = 
    array_remove(shuffledArray, shuffledArray[array_length(shuffledArray, 1)])
    WHERE id = $1;`,
    [session?.user?.email],
  );
}
