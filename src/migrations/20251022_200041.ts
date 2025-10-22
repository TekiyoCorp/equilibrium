import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_new_concept_section" DROP COLUMN "label";
  ALTER TABLE "pages_blocks_new_concept_section" DROP COLUMN "subtitle";
  ALTER TABLE "pages_blocks_new_concept_section" DROP COLUMN "description";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_new_concept_section" ADD COLUMN "label" varchar DEFAULT 'Concept';
  ALTER TABLE "pages_blocks_new_concept_section" ADD COLUMN "subtitle" varchar;
  ALTER TABLE "pages_blocks_new_concept_section" ADD COLUMN "description" varchar NOT NULL;`)
}
