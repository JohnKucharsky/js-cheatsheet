"use server";

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

export async function shuffleArray(email: string | null | undefined) {
  const data = await db.query(
    `SELECT id FROM 
    js_cheatsheet WHERE id = $1`,
    [email],
  );

  if (data.rows.length === 0) {
    const shuffledArray = shuffleArrayOfItems();

    await db.query(
      `INSERT INTO js_cheatsheet(id, shuffledArray)
        VALUES
        ($1, $2)`,
      [email, shuffledArray],
    );
    return shuffledArray;
  } else {
    const shuffledArray = shuffleArrayOfItems();

    await db.query(
      `UPDATE js_cheatsheet
        SET shuffledArray = $1,
        current_index = 0
        WHERE id = $2;`,
      [shuffledArray, email],
    );
    return shuffledArray;
  }
}

export async function getAllItems(email: string | undefined | null) {
  const res = await db.query<{
    shuffledarray: string[];
    current_index: number;
  }>(`select shuffledArray, current_index from js_cheatsheet WHERE id = $1`, [
    email,
  ]);
  return res.rows;
}

export async function nextItem({
  currentIndex,
  email,
}: {
  currentIndex: number;
  email: string | null | undefined;
}) {
  await db.query(
    `UPDATE js_cheatsheet
    SET current_index = $2
    WHERE id = $1`,
    [email, currentIndex],
  );
}
