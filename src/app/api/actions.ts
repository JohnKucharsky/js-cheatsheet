"use server";

import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { shuffledItems, userShuffleState } from "@/db/schema";
import { and, eq, gt } from "drizzle-orm";
import { shuffle } from "@/lib/utils";
import { getAllFilesNames } from "@/get-mdx-components";

const pool = new Pool();

const db = drizzle({ client: pool });

// initialize
export async function initializeShuffledItems(userId: string) {
  const allNames = getAllFilesNames();
  const shuffledIds = allNames.map(({ slug }) => slug);
  shuffle(shuffledIds);

  await db.transaction(async (trx) => {
    // Clear previous data
    await trx.delete(shuffledItems).where(eq(shuffledItems.userId, userId));
    await trx
      .delete(userShuffleState)
      .where(eq(userShuffleState.userId, userId));

    // Insert shuffled items
    const itemsToInsert = shuffledIds.map((itemId, index) => ({
      userId,
      itemId,
      orderPos: index,
    }));
    await trx.insert(shuffledItems).values(itemsToInsert);

    // Insert initial user state
    await trx.insert(userShuffleState).values({ userId, currentOrderPos: 0 });
  });
}
// initialize

// get current
export async function getCurrentItem(userId: string) {
  // Fetch the current position for the user
  const state = await db
    .select({ currentOrderPos: userShuffleState.currentOrderPos })
    .from(userShuffleState)
    .where(eq(userShuffleState.userId, userId))
    .limit(1);

  if (state.length === 0) {
    throw new Error(`No shuffle state found for user: ${userId}`);
  }

  const currentOrderPos = state[0].currentOrderPos;

  // Fetch the current item
  const result = await db
    .select({ itemId: shuffledItems.itemId })
    .from(shuffledItems)
    .where(
      and(
        eq(shuffledItems.userId, userId),
        eq(shuffledItems.orderPos, currentOrderPos),
      ),
    )
    .limit(1);

  return {
    currentItem: result[0]?.itemId || null,
    currentState: state[0]?.currentOrderPos,
  };
}
// get current

export const getTotalItems = async () => getAllFilesNames().length;

// move to next
export async function moveToNextItem(userId: string) {
  const state = await db
    .select({ currentOrderPos: userShuffleState.currentOrderPos })
    .from(userShuffleState)
    .where(eq(userShuffleState.userId, userId))
    .limit(1);

  if (state.length === 0) {
    throw new Error(`No shuffle state found for user: ${userId}`);
  }

  const currentOrderPos = state[0].currentOrderPos;

  // Find the next item
  const nextItem = await db
    .select({ orderPos: shuffledItems.orderPos })
    .from(shuffledItems)
    .where(
      and(
        eq(shuffledItems.userId, userId),
        gt(shuffledItems.orderPos, currentOrderPos),
      ),
    )
    .orderBy(shuffledItems.orderPos)
    .limit(1);

  if (nextItem.length > 0) {
    // Update user's current position
    await db
      .update(userShuffleState)
      .set({ currentOrderPos: nextItem[0].orderPos })
      .where(eq(userShuffleState.userId, userId));
  }
}
// move to next
