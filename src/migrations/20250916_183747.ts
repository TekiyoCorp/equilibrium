import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_link_link_type" AS ENUM('url', 'page');
  CREATE TYPE "public"."enum_pages_blocks_link_variant" AS ENUM('primary', 'secondary', 'ghost');
  CREATE TYPE "public"."enum_pages_blocks_link_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_pages_blocks_center_hero_background" AS ENUM('light', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_right_hero_background" AS ENUM('light', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_contact_hero_background" AS ENUM('light', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_button_link_type" AS ENUM('url', 'page');
  CREATE TYPE "public"."enum_pages_blocks_button_variant" AS ENUM('primary', 'secondary', 'ghost');
  CREATE TYPE "public"."enum_pages_blocks_button_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_pages_blocks_text_media_tiles_items_image_placement" AS ENUM('top', 'bottom');
  CREATE TYPE "public"."enum_pages_blocks_text_media_tiles_items_image_align" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_header_blocks_link_link_type" AS ENUM('url', 'page');
  CREATE TYPE "public"."enum_header_blocks_link_variant" AS ENUM('primary', 'secondary', 'ghost');
  CREATE TYPE "public"."enum_header_blocks_link_target" AS ENUM('_self', '_blank');
  CREATE TYPE "public"."enum_footer_columns_items_type" AS ENUM('text', 'link');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "pages_blocks_link" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"link_type" "enum_pages_blocks_link_link_type" DEFAULT 'url',
  	"href" varchar,
  	"page_id" integer,
  	"variant" "enum_pages_blocks_link_variant" DEFAULT 'primary',
  	"target" "enum_pages_blocks_link_target" DEFAULT '_self',
  	"full_width" boolean DEFAULT false,
  	"aria_label" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_center_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"subheading" varchar,
  	"background_image_id" integer,
  	"background" "enum_pages_blocks_center_hero_background" DEFAULT 'light',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_right_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"subheading" varchar,
  	"image_id" integer,
  	"background_image_id" integer,
  	"background" "enum_pages_blocks_right_hero_background" DEFAULT 'light',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"subheading" varchar,
  	"email" varchar,
  	"phone" varchar,
  	"background_image_id" integer,
  	"background" "enum_pages_blocks_contact_hero_background" DEFAULT 'light',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_media_card_slider_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_media_card_slider" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_course_cards_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar
  );
  
  CREATE TABLE "pages_blocks_button" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"link_type" "enum_pages_blocks_button_link_type" DEFAULT 'url',
  	"href" varchar,
  	"page_id" integer,
  	"variant" "enum_pages_blocks_button_variant" DEFAULT 'primary',
  	"target" "enum_pages_blocks_button_target" DEFAULT '_self',
  	"full_width" boolean DEFAULT false,
  	"aria_label" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_course_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_overlay_feature_section_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_overlay_feature_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"overlay_word" varchar,
  	"background_image_id" integer NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_text_media_tiles_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"lead" varchar,
  	"body" varchar,
  	"image_id" integer NOT NULL,
  	"image_placement" "enum_pages_blocks_text_media_tiles_items_image_placement" DEFAULT 'bottom',
  	"image_align" "enum_pages_blocks_text_media_tiles_items_image_align" DEFAULT 'center'
  );
  
  CREATE TABLE "pages_blocks_text_media_tiles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_concept_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_faq_section_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_faq_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"content" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"pages_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "header_blocks_link" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"link_type" "enum_header_blocks_link_link_type" DEFAULT 'url',
  	"href" varchar,
  	"page_id" integer,
  	"variant" "enum_header_blocks_link_variant" DEFAULT 'primary',
  	"target" "enum_header_blocks_link_target" DEFAULT '_self',
  	"full_width" boolean DEFAULT false,
  	"aria_label" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_image_id" integer,
  	"logo_alt" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "footer_columns_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_footer_columns_items_type" DEFAULT 'text' NOT NULL,
  	"text" varchar,
  	"link_label" varchar,
  	"link_href" varchar,
  	"link_new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "footer_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL
  );
  
  CREATE TABLE "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_image_id" integer,
  	"legal_copyright" varchar,
  	"legal_byline" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_link" ADD CONSTRAINT "pages_blocks_link_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_link" ADD CONSTRAINT "pages_blocks_link_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_center_hero" ADD CONSTRAINT "pages_blocks_center_hero_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_center_hero" ADD CONSTRAINT "pages_blocks_center_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_right_hero" ADD CONSTRAINT "pages_blocks_right_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_right_hero" ADD CONSTRAINT "pages_blocks_right_hero_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_right_hero" ADD CONSTRAINT "pages_blocks_right_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_hero" ADD CONSTRAINT "pages_blocks_contact_hero_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_hero" ADD CONSTRAINT "pages_blocks_contact_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_media_card_slider_items" ADD CONSTRAINT "pages_blocks_media_card_slider_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_media_card_slider_items" ADD CONSTRAINT "pages_blocks_media_card_slider_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_media_card_slider"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_media_card_slider" ADD CONSTRAINT "pages_blocks_media_card_slider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_course_cards_items" ADD CONSTRAINT "pages_blocks_course_cards_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_course_cards_items" ADD CONSTRAINT "pages_blocks_course_cards_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_course_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_button" ADD CONSTRAINT "pages_blocks_button_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_button" ADD CONSTRAINT "pages_blocks_button_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_course_cards" ADD CONSTRAINT "pages_blocks_course_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_overlay_feature_section_items" ADD CONSTRAINT "pages_blocks_overlay_feature_section_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_overlay_feature_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_overlay_feature_section" ADD CONSTRAINT "pages_blocks_overlay_feature_section_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_overlay_feature_section" ADD CONSTRAINT "pages_blocks_overlay_feature_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_text_media_tiles_items" ADD CONSTRAINT "pages_blocks_text_media_tiles_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_text_media_tiles_items" ADD CONSTRAINT "pages_blocks_text_media_tiles_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_text_media_tiles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_text_media_tiles" ADD CONSTRAINT "pages_blocks_text_media_tiles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_concept_section" ADD CONSTRAINT "pages_blocks_concept_section_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_concept_section" ADD CONSTRAINT "pages_blocks_concept_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_section_items" ADD CONSTRAINT "pages_blocks_faq_section_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_section" ADD CONSTRAINT "pages_blocks_faq_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_blocks_link" ADD CONSTRAINT "header_blocks_link_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header_blocks_link" ADD CONSTRAINT "header_blocks_link_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header" ADD CONSTRAINT "header_logo_image_id_media_id_fk" FOREIGN KEY ("logo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_columns_items" ADD CONSTRAINT "footer_columns_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns" ADD CONSTRAINT "footer_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer" ADD CONSTRAINT "footer_logo_image_id_media_id_fk" FOREIGN KEY ("logo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "pages_blocks_link_order_idx" ON "pages_blocks_link" USING btree ("_order");
  CREATE INDEX "pages_blocks_link_parent_id_idx" ON "pages_blocks_link" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_link_path_idx" ON "pages_blocks_link" USING btree ("_path");
  CREATE INDEX "pages_blocks_link_page_idx" ON "pages_blocks_link" USING btree ("page_id");
  CREATE INDEX "pages_blocks_center_hero_order_idx" ON "pages_blocks_center_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_center_hero_parent_id_idx" ON "pages_blocks_center_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_center_hero_path_idx" ON "pages_blocks_center_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_center_hero_background_image_idx" ON "pages_blocks_center_hero" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_right_hero_order_idx" ON "pages_blocks_right_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_right_hero_parent_id_idx" ON "pages_blocks_right_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_right_hero_path_idx" ON "pages_blocks_right_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_right_hero_image_idx" ON "pages_blocks_right_hero" USING btree ("image_id");
  CREATE INDEX "pages_blocks_right_hero_background_image_idx" ON "pages_blocks_right_hero" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_contact_hero_order_idx" ON "pages_blocks_contact_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_hero_parent_id_idx" ON "pages_blocks_contact_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_hero_path_idx" ON "pages_blocks_contact_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_contact_hero_background_image_idx" ON "pages_blocks_contact_hero" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_media_card_slider_items_order_idx" ON "pages_blocks_media_card_slider_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_media_card_slider_items_parent_id_idx" ON "pages_blocks_media_card_slider_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_media_card_slider_items_image_idx" ON "pages_blocks_media_card_slider_items" USING btree ("image_id");
  CREATE INDEX "pages_blocks_media_card_slider_order_idx" ON "pages_blocks_media_card_slider" USING btree ("_order");
  CREATE INDEX "pages_blocks_media_card_slider_parent_id_idx" ON "pages_blocks_media_card_slider" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_media_card_slider_path_idx" ON "pages_blocks_media_card_slider" USING btree ("_path");
  CREATE INDEX "pages_blocks_course_cards_items_order_idx" ON "pages_blocks_course_cards_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_course_cards_items_parent_id_idx" ON "pages_blocks_course_cards_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_course_cards_items_image_idx" ON "pages_blocks_course_cards_items" USING btree ("image_id");
  CREATE INDEX "pages_blocks_button_order_idx" ON "pages_blocks_button" USING btree ("_order");
  CREATE INDEX "pages_blocks_button_parent_id_idx" ON "pages_blocks_button" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_button_path_idx" ON "pages_blocks_button" USING btree ("_path");
  CREATE INDEX "pages_blocks_button_page_idx" ON "pages_blocks_button" USING btree ("page_id");
  CREATE INDEX "pages_blocks_course_cards_order_idx" ON "pages_blocks_course_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_course_cards_parent_id_idx" ON "pages_blocks_course_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_course_cards_path_idx" ON "pages_blocks_course_cards" USING btree ("_path");
  CREATE INDEX "pages_blocks_overlay_feature_section_items_order_idx" ON "pages_blocks_overlay_feature_section_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_overlay_feature_section_items_parent_id_idx" ON "pages_blocks_overlay_feature_section_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_overlay_feature_section_order_idx" ON "pages_blocks_overlay_feature_section" USING btree ("_order");
  CREATE INDEX "pages_blocks_overlay_feature_section_parent_id_idx" ON "pages_blocks_overlay_feature_section" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_overlay_feature_section_path_idx" ON "pages_blocks_overlay_feature_section" USING btree ("_path");
  CREATE INDEX "pages_blocks_overlay_feature_section_background_image_idx" ON "pages_blocks_overlay_feature_section" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_text_media_tiles_items_order_idx" ON "pages_blocks_text_media_tiles_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_text_media_tiles_items_parent_id_idx" ON "pages_blocks_text_media_tiles_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_text_media_tiles_items_image_idx" ON "pages_blocks_text_media_tiles_items" USING btree ("image_id");
  CREATE INDEX "pages_blocks_text_media_tiles_order_idx" ON "pages_blocks_text_media_tiles" USING btree ("_order");
  CREATE INDEX "pages_blocks_text_media_tiles_parent_id_idx" ON "pages_blocks_text_media_tiles" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_text_media_tiles_path_idx" ON "pages_blocks_text_media_tiles" USING btree ("_path");
  CREATE INDEX "pages_blocks_concept_section_order_idx" ON "pages_blocks_concept_section" USING btree ("_order");
  CREATE INDEX "pages_blocks_concept_section_parent_id_idx" ON "pages_blocks_concept_section" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_concept_section_path_idx" ON "pages_blocks_concept_section" USING btree ("_path");
  CREATE INDEX "pages_blocks_concept_section_background_image_idx" ON "pages_blocks_concept_section" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_faq_section_items_order_idx" ON "pages_blocks_faq_section_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_section_items_parent_id_idx" ON "pages_blocks_faq_section_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_section_order_idx" ON "pages_blocks_faq_section" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_section_parent_id_idx" ON "pages_blocks_faq_section" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_section_path_idx" ON "pages_blocks_faq_section" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "header_blocks_link_order_idx" ON "header_blocks_link" USING btree ("_order");
  CREATE INDEX "header_blocks_link_parent_id_idx" ON "header_blocks_link" USING btree ("_parent_id");
  CREATE INDEX "header_blocks_link_path_idx" ON "header_blocks_link" USING btree ("_path");
  CREATE INDEX "header_blocks_link_page_idx" ON "header_blocks_link" USING btree ("page_id");
  CREATE INDEX "header_logo_logo_image_idx" ON "header" USING btree ("logo_image_id");
  CREATE INDEX "footer_columns_items_order_idx" ON "footer_columns_items" USING btree ("_order");
  CREATE INDEX "footer_columns_items_parent_id_idx" ON "footer_columns_items" USING btree ("_parent_id");
  CREATE INDEX "footer_columns_order_idx" ON "footer_columns" USING btree ("_order");
  CREATE INDEX "footer_columns_parent_id_idx" ON "footer_columns" USING btree ("_parent_id");
  CREATE INDEX "footer_logo_logo_image_idx" ON "footer" USING btree ("logo_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "pages_blocks_link" CASCADE;
  DROP TABLE "pages_blocks_center_hero" CASCADE;
  DROP TABLE "pages_blocks_right_hero" CASCADE;
  DROP TABLE "pages_blocks_contact_hero" CASCADE;
  DROP TABLE "pages_blocks_media_card_slider_items" CASCADE;
  DROP TABLE "pages_blocks_media_card_slider" CASCADE;
  DROP TABLE "pages_blocks_course_cards_items" CASCADE;
  DROP TABLE "pages_blocks_button" CASCADE;
  DROP TABLE "pages_blocks_course_cards" CASCADE;
  DROP TABLE "pages_blocks_overlay_feature_section_items" CASCADE;
  DROP TABLE "pages_blocks_overlay_feature_section" CASCADE;
  DROP TABLE "pages_blocks_text_media_tiles_items" CASCADE;
  DROP TABLE "pages_blocks_text_media_tiles" CASCADE;
  DROP TABLE "pages_blocks_concept_section" CASCADE;
  DROP TABLE "pages_blocks_faq_section_items" CASCADE;
  DROP TABLE "pages_blocks_faq_section" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "header_blocks_link" CASCADE;
  DROP TABLE "header" CASCADE;
  DROP TABLE "footer_columns_items" CASCADE;
  DROP TABLE "footer_columns" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_link_link_type";
  DROP TYPE "public"."enum_pages_blocks_link_variant";
  DROP TYPE "public"."enum_pages_blocks_link_target";
  DROP TYPE "public"."enum_pages_blocks_center_hero_background";
  DROP TYPE "public"."enum_pages_blocks_right_hero_background";
  DROP TYPE "public"."enum_pages_blocks_contact_hero_background";
  DROP TYPE "public"."enum_pages_blocks_button_link_type";
  DROP TYPE "public"."enum_pages_blocks_button_variant";
  DROP TYPE "public"."enum_pages_blocks_button_target";
  DROP TYPE "public"."enum_pages_blocks_text_media_tiles_items_image_placement";
  DROP TYPE "public"."enum_pages_blocks_text_media_tiles_items_image_align";
  DROP TYPE "public"."enum_header_blocks_link_link_type";
  DROP TYPE "public"."enum_header_blocks_link_variant";
  DROP TYPE "public"."enum_header_blocks_link_target";
  DROP TYPE "public"."enum_footer_columns_items_type";`)
}
