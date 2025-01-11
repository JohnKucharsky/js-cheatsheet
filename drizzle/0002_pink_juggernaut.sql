CREATE TABLE "user_shuffle_state" (
	"user_id" text PRIMARY KEY NOT NULL,
	"current_order_pos" integer DEFAULT 0 NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
