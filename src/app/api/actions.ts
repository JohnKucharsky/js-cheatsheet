"use server";

import { auth } from "@/auth";
import { Pool } from "pg";
import { getAllFilesNames } from "@/get-mdx-components";
import { shuffle } from "@/lib/utils";

const db = new Pool();

const shuffleArrayOfItems = () => {
  const allNames = getAllFilesNames();
  const shuffledArray = allNames.map(({ slug }) => slug);
  shuffle(shuffledArray);

  return shuffledArray;
};

export async function shuffleArray() {
  const session = await auth();

  const data = await db.query(
    `SELECT id FROM 
    js_cheatsheet WHERE id = $1`,
    [session?.user?.email],
  );

  if (data.rows.length === 0) {
    const shuffledArray = shuffleArrayOfItems();

    await db.query(
      `INSERT INTO js_cheatsheet(id, shuffledArray)
        VALUES
        ($1, $2)`,
      [session?.user?.email, shuffledArray],
    );
    return shuffledArray[0];
  } else {
    const shuffledArray = shuffleArrayOfItems();

    await db.query(
      `UPDATE js_cheatsheet
        SET shuffledArray = $1,
        current_index = 0
        WHERE id = $2;`,
      [shuffledArray, session?.user?.email],
    );
    return shuffledArray[0];
  }
}

export async function getAllItems() {
  const session = await auth();

  const res = await db.query<{
    shuffledarray: string[];
    current_index: number;
  }>(`select shuffledArray, current_index from js_cheatsheet WHERE id = $1`, [
    session?.user?.email,
  ]);

  return res.rows;
}

export async function nextItem({ currentIndex }: { currentIndex: number }) {
  const session = await auth();

  await db.query(
    `UPDATE js_cheatsheet
    SET current_index = $2
    WHERE id = $1`,
    [session?.user?.email, currentIndex],
  );
}
