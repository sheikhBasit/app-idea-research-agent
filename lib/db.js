import { neon } from "@neondatabase/serverless";

const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;

let sqlClient;
let schemaReady = false;

export function hasDatabase() {
  return Boolean(connectionString);
}

export function getSql() {
  if (!connectionString) {
    throw new Error("Missing DATABASE_URL or POSTGRES_URL environment variable.");
  }
  if (!sqlClient) sqlClient = neon(connectionString);
  return sqlClient;
}

export async function ensureSchema() {
  if (schemaReady) return;
  const sql = getSql();
  await sql`
    CREATE TABLE IF NOT EXISTS saved_ideas (
      id BIGSERIAL PRIMARY KEY,
      user_key TEXT NOT NULL,
      idea_id TEXT NOT NULL,
      idea_name TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      UNIQUE (user_key, idea_id)
    )
  `;
  schemaReady = true;
}
