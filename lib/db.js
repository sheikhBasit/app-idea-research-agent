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
  await sql`
    CREATE TABLE IF NOT EXISTS idea_boards (
      id BIGSERIAL PRIMARY KEY,
      board_date DATE NOT NULL,
      ideas JSONB NOT NULL,
      summary TEXT NOT NULL,
      source TEXT NOT NULL,
      evidence_count INTEGER NOT NULL DEFAULT 0,
      is_active BOOLEAN NOT NULL DEFAULT FALSE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  await sql`
    CREATE UNIQUE INDEX IF NOT EXISTS idea_boards_one_active
    ON idea_boards (is_active)
    WHERE is_active = TRUE
  `;
  schemaReady = true;
}
