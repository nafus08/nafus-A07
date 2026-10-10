import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { Pool } from "pg";

if (!process.env.DATABASE_URL) {
  throw new Error("Set DATABASE_URL before running database migrations.");
}

const migrationName = "0000_parched_wendell_vaughn";
const migrationPath = fileURLToPath(
  new URL(`../drizzle/${migrationName}.sql`, import.meta.url),
);
const migration = await readFile(migrationPath, "utf8");
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const client = await pool.connect();

try {
  await client.query("BEGIN");
  await client.query(`
    CREATE TABLE IF NOT EXISTS bazar_dor_migrations (
      name text PRIMARY KEY,
      applied_at timestamptz NOT NULL DEFAULT now()
    )
  `);
  const result = await client.query(
    "SELECT 1 FROM bazar_dor_migrations WHERE name = $1",
    [migrationName],
  );

  if (result.rowCount === 0) {
    for (const statement of migration.split("--> statement-breakpoint")) {
      if (statement.trim()) await client.query(statement);
    }
    await client.query(
      "INSERT INTO bazar_dor_migrations (name) VALUES ($1)",
      [migrationName],
    );
    console.log(`Applied database migration ${migrationName}.`);
  } else {
    console.log(`Database migration ${migrationName} is already applied.`);
  }

  await client.query("COMMIT");
} catch (error) {
  await client.query("ROLLBACK");
  throw error;
} finally {
  client.release();
  await pool.end();
}
