import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_chat_section_messages_sender" AS ENUM('user', 'equilibrium');
  CREATE TYPE "public"."enum_pages_blocks_concept_icons_section_background_color" AS ENUM('#ffffff', '#f8f9fa', 'custom');
  CREATE TABLE "pages_blocks_chat_section_messages" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sender" "enum_pages_blocks_chat_section_messages_sender" NOT NULL,
  	"sender_name" varchar NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_chat_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Lorem Ipsum ?',
  	"whatsapp_text" varchar DEFAULT 'Whatsapp Business',
  	"whatsapp_icon_id" integer,
  	"whatsapp_url" varchar DEFAULT '#',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_concept_icons_section_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_id" integer NOT NULL,
  	"label" varchar DEFAULT 'Concept'
  );
  
  CREATE TABLE "pages_blocks_concept_icons_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Concept',
  	"background_color" "enum_pages_blocks_concept_icons_section_background_color" DEFAULT '#ffffff',
  	"custom_background_color" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_chat_section_messages" ADD CONSTRAINT "pages_blocks_chat_section_messages_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_chat_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_chat_section" ADD CONSTRAINT "pages_blocks_chat_section_whatsapp_icon_id_media_id_fk" FOREIGN KEY ("whatsapp_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_chat_section" ADD CONSTRAINT "pages_blocks_chat_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_concept_icons_section_items" ADD CONSTRAINT "pages_blocks_concept_icons_section_items_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_concept_icons_section_items" ADD CONSTRAINT "pages_blocks_concept_icons_section_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_concept_icons_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_concept_icons_section" ADD CONSTRAINT "pages_blocks_concept_icons_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_chat_section_messages_order_idx" ON "pages_blocks_chat_section_messages" USING btree ("_order");
  CREATE INDEX "pages_blocks_chat_section_messages_parent_id_idx" ON "pages_blocks_chat_section_messages" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_chat_section_order_idx" ON "pages_blocks_chat_section" USING btree ("_order");
  CREATE INDEX "pages_blocks_chat_section_parent_id_idx" ON "pages_blocks_chat_section" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_chat_section_path_idx" ON "pages_blocks_chat_section" USING btree ("_path");
  CREATE INDEX "pages_blocks_chat_section_whatsapp_icon_idx" ON "pages_blocks_chat_section" USING btree ("whatsapp_icon_id");
  CREATE INDEX "pages_blocks_concept_icons_section_items_order_idx" ON "pages_blocks_concept_icons_section_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_concept_icons_section_items_parent_id_idx" ON "pages_blocks_concept_icons_section_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_concept_icons_section_items_icon_idx" ON "pages_blocks_concept_icons_section_items" USING btree ("icon_id");
  CREATE INDEX "pages_blocks_concept_icons_section_order_idx" ON "pages_blocks_concept_icons_section" USING btree ("_order");
  CREATE INDEX "pages_blocks_concept_icons_section_parent_id_idx" ON "pages_blocks_concept_icons_section" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_concept_icons_section_path_idx" ON "pages_blocks_concept_icons_section" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_chat_section_messages" CASCADE;
  DROP TABLE "pages_blocks_chat_section" CASCADE;
  DROP TABLE "pages_blocks_concept_icons_section_items" CASCADE;
  DROP TABLE "pages_blocks_concept_icons_section" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_chat_section_messages_sender";
  DROP TYPE "public"."enum_pages_blocks_concept_icons_section_background_color";`)
}
