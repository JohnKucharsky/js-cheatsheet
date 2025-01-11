import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const shuffledItems = pgTable("shuffled_items", {
  id: serial("id").primaryKey(), // Unique ID for each record
  userId: text("user_id").notNull(), // Google user ID
  itemId: text("item_id").notNull(), // Shuffled item as a string
  orderPos: integer("order_pos").notNull(), // Position in the shuffled order
  createdAt: timestamp("created_at").defaultNow(), // Timestamp of creation
});

export const userShuffleState = pgTable("user_shuffle_state", {
  userId: text("user_id").notNull().primaryKey(), // Google user ID, unique per user
  currentOrderPos: integer("current_order_pos").notNull().default(0), // Current position in the shuffled array
  updatedAt: timestamp("updated_at").defaultNow().notNull(), // Timestamp of last update
});
