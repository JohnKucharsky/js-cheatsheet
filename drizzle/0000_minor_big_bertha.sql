CREATE TABLE "shuffled_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"item_id" integer NOT NULL,
	"order_pos" integer NOT NULL,
	"created_at" timestamp DEFAULT now()
);
