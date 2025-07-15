ALTER TABLE "purchases" ALTER COLUMN "payment_method" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "purchases" ALTER COLUMN "mp_payment_id" SET DATA TYPE varchar;