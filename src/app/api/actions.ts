"use server";
import { auth } from "@/auth";
import { Pool } from "pg";
import { redirect } from "next/navigation";
import { getAllFilesNames } from "@/get-mdx-components";

const client = new Pool();

const shuffleArrayOfItems = () => {
  const shuffle = (array: string[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const allNames = getAllFilesNames();
  const shuffledArray = allNames.map(({ slug }) => slug);
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
    const shuffledArray = shuffleArrayOfItems();

    await client.query(
        `INSERT INTO js_cheatsheet(id, shuffledArray)
        VALUES
        ($1, $2)`,
        [session?.user?.email, shuffledArray],
    );
  } else {
    const shuffledArray = shuffleArrayOfItems();

    await client.query(
      `UPDATE js_cheatsheet
        SET shuffledArray = $1
        WHERE id = $2;`,
      [shuffledArray, session?.user?.email],
    );
  }
}

export async function getFirstItem(): Promise<
  Record<"problem_name", number | null>[]
> {
  const session = await auth();

  const res = await client.query(
    `SELECT shuffledArray[array_length(shuffledArray, 1)] as problem_name FROM js_cheatsheet
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
    WHERE id = $1 returning shuffledArray[array_length(shuffledArray, 1)] as problem_name`,
    [session?.user?.email],
  );

  if (
    res.rows[0]?.problem_name !== undefined &&
    res.rows[0].problem_name !== null
  ) {
    redirect(`/pick-random/${res.rows[0].problem_name}`);
  } else {
    redirect(`/pick-random`);
  }
}

export async function itemsLeftInList(): Promise<number | null | undefined> {
  const session = await auth();

  const res = await client.query(
    `SELECT shuffledArray FROM js_cheatsheet WHERE id = $1`,
    [session?.user?.email],
  );

  return res.rows[0]?.shuffledarray?.length;
}
