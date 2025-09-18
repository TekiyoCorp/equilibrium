import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_coaches_grid_items_cta_link_type" AS ENUM('url', 'page');
  CREATE TYPE "public"."enum_pages_blocks_coaches_grid_items_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_pages_blocks_coaches_grid_background" AS ENUM('light', 'dark');
  CREATE TABLE "pages_blocks_text_image_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL,
  	"subtitle" varchar,
  	"image_id" integer NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_new_concept_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar DEFAULT 'Concept',
  	"title" varchar NOT NULL,
  	"subtitle" varchar,
  	"background_image_id" integer NOT NULL,
  	"description" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_coaches_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"course_name" varchar NOT NULL,
  	"instructor_name" varchar NOT NULL,
  	"description" varchar,
  	"cta_label" varchar,
  	"cta_link_type" "enum_pages_blocks_coaches_grid_items_cta_link_type" DEFAULT 'url',
  	"href" varchar,
  	"page_id" integer,
  	"target" "enum_pages_blocks_coaches_grid_items_target" DEFAULT '_self',
  	"aria_label" varchar
  );
  
  CREATE TABLE "pages_blocks_coaches_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar NOT NULL,
  	"subtitle" varchar,
  	"background_image_id" integer,
  	"background" "enum_pages_blocks_coaches_grid_background" DEFAULT 'light',
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_faq_section" ADD COLUMN "large_image_id" integer;
  ALTER TABLE "pages_blocks_faq_section" ADD COLUMN "small_image_id" integer;
  ALTER TABLE "pages_blocks_text_image_block" ADD CONSTRAINT "pages_blocks_text_image_block_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_text_image_block" ADD CONSTRAINT "pages_blocks_text_image_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_new_concept_section" ADD CONSTRAINT "pages_blocks_new_concept_section_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_new_concept_section" ADD CONSTRAINT "pages_blocks_new_concept_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_coaches_grid_items" ADD CONSTRAINT "pages_blocks_coaches_grid_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_coaches_grid_items" ADD CONSTRAINT "pages_blocks_coaches_grid_items_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_coaches_grid_items" ADD CONSTRAINT "pages_blocks_coaches_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_coaches_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_coaches_grid" ADD CONSTRAINT "pages_blocks_coaches_grid_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_coaches_grid" ADD CONSTRAINT "pages_blocks_coaches_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_text_image_block_order_idx" ON "pages_blocks_text_image_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_text_image_block_parent_id_idx" ON "pages_blocks_text_image_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_text_image_block_path_idx" ON "pages_blocks_text_image_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_text_image_block_image_idx" ON "pages_blocks_text_image_block" USING btree ("image_id");
  CREATE INDEX "pages_blocks_new_concept_section_order_idx" ON "pages_blocks_new_concept_section" USING btree ("_order");
  CREATE INDEX "pages_blocks_new_concept_section_parent_id_idx" ON "pages_blocks_new_concept_section" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_new_concept_section_path_idx" ON "pages_blocks_new_concept_section" USING btree ("_path");
  CREATE INDEX "pages_blocks_new_concept_section_background_image_idx" ON "pages_blocks_new_concept_section" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_coaches_grid_items_order_idx" ON "pages_blocks_coaches_grid_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_coaches_grid_items_parent_id_idx" ON "pages_blocks_coaches_grid_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_coaches_grid_items_image_idx" ON "pages_blocks_coaches_grid_items" USING btree ("image_id");
  CREATE INDEX "pages_blocks_coaches_grid_items_page_idx" ON "pages_blocks_coaches_grid_items" USING btree ("page_id");
  CREATE INDEX "pages_blocks_coaches_grid_order_idx" ON "pages_blocks_coaches_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_coaches_grid_parent_id_idx" ON "pages_blocks_coaches_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_coaches_grid_path_idx" ON "pages_blocks_coaches_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_coaches_grid_background_image_idx" ON "pages_blocks_coaches_grid" USING btree ("background_image_id");
  ALTER TABLE "pages_blocks_faq_section" ADD CONSTRAINT "pages_blocks_faq_section_large_image_id_media_id_fk" FOREIGN KEY ("large_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_section" ADD CONSTRAINT "pages_blocks_faq_section_small_image_id_media_id_fk" FOREIGN KEY ("small_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_faq_section_large_image_idx" ON "pages_blocks_faq_section" USING btree ("large_image_id");
  CREATE INDEX "pages_blocks_faq_section_small_image_idx" ON "pages_blocks_faq_section" USING btree ("small_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_text_image_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_new_concept_section" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_coaches_grid_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_coaches_grid" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_text_image_block" CASCADE;
  DROP TABLE "pages_blocks_new_concept_section" CASCADE;
  DROP TABLE "pages_blocks_coaches_grid_items" CASCADE;
  DROP TABLE "pages_blocks_coaches_grid" CASCADE;
  ALTER TABLE "pages_blocks_faq_section" DROP CONSTRAINT "pages_blocks_faq_section_large_image_id_media_id_fk";
  
  ALTER TABLE "pages_blocks_faq_section" DROP CONSTRAINT "pages_blocks_faq_section_small_image_id_media_id_fk";
  
  DROP INDEX "pages_blocks_faq_section_large_image_idx";
  DROP INDEX "pages_blocks_faq_section_small_image_idx";
  ALTER TABLE "pages_blocks_faq_section" DROP COLUMN "large_image_id";
  ALTER TABLE "pages_blocks_faq_section" DROP COLUMN "small_image_id";
  DROP TYPE "public"."enum_pages_blocks_coaches_grid_items_cta_link_type";
  DROP TYPE "public"."enum_pages_blocks_coaches_grid_items_target";
  DROP TYPE "public"."enum_pages_blocks_coaches_grid_background";`)
}
