import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_location_locations" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"address" varchar NOT NULL,
  	"coordinates_lat" numeric NOT NULL,
  	"coordinates_lng" numeric NOT NULL,
  	"schedule_weekdays" varchar NOT NULL,
  	"schedule_weekends" varchar NOT NULL,
  	"is_highlighted" boolean DEFAULT false
  );
  
  CREATE TABLE "pages_blocks_location" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"map_placeholder" varchar DEFAULT '<Map>',
  	"whatsapp_text" varchar DEFAULT 'Whatsapp Business',
  	"whatsapp_icon_id" integer,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_location_locations" ADD CONSTRAINT "pages_blocks_location_locations_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_location"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_location" ADD CONSTRAINT "pages_blocks_location_whatsapp_icon_id_media_id_fk" FOREIGN KEY ("whatsapp_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_location" ADD CONSTRAINT "pages_blocks_location_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_location_locations_order_idx" ON "pages_blocks_location_locations" USING btree ("_order");
  CREATE INDEX "pages_blocks_location_locations_parent_id_idx" ON "pages_blocks_location_locations" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_location_order_idx" ON "pages_blocks_location" USING btree ("_order");
  CREATE INDEX "pages_blocks_location_parent_id_idx" ON "pages_blocks_location" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_location_path_idx" ON "pages_blocks_location" USING btree ("_path");
  CREATE INDEX "pages_blocks_location_whatsapp_icon_idx" ON "pages_blocks_location" USING btree ("whatsapp_icon_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_location_locations" CASCADE;
  DROP TABLE "pages_blocks_location" CASCADE;`)
}
