import { ensureSchema, hasDatabase, getSql } from "../../../lib/db";

function json(body, status = 200) {
  return Response.json(body, { status });
}

function getUserKey(request) {
  const { searchParams } = new URL(request.url);
  return searchParams.get("userKey") || request.headers.get("x-user-key") || "";
}

export async function GET(request) {
  if (!hasDatabase()) {
    return json({ storage: "local", savedIdeas: [] });
  }

  const userKey = getUserKey(request);
  if (!userKey) return json({ error: "userKey is required" }, 400);

  await ensureSchema();
  const sql = getSql();
  const savedIdeas = await sql`
    SELECT idea_id AS "ideaId", idea_name AS "ideaName", created_at AS "createdAt"
    FROM saved_ideas
    WHERE user_key = ${userKey}
    ORDER BY created_at DESC
  `;

  return json({ storage: "neon", savedIdeas });
}

export async function POST(request) {
  if (!hasDatabase()) {
    return json({ storage: "local", savedIdeas: [] });
  }

  const body = await request.json();
  const userKey = body.userKey || "";
  const ideaId = body.ideaId || "";
  const ideaName = body.ideaName || "";

  if (!userKey || !ideaId || !ideaName) {
    return json({ error: "userKey, ideaId, and ideaName are required" }, 400);
  }

  await ensureSchema();
  const sql = getSql();
  await sql`
    INSERT INTO saved_ideas (user_key, idea_id, idea_name)
    VALUES (${userKey}, ${ideaId}, ${ideaName})
    ON CONFLICT (user_key, idea_id) DO NOTHING
  `;

  return json({ storage: "neon", saved: true });
}

export async function DELETE(request) {
  if (!hasDatabase()) {
    return json({ storage: "local", deleted: true });
  }

  const { searchParams } = new URL(request.url);
  const userKey = searchParams.get("userKey") || "";
  const ideaId = searchParams.get("ideaId") || "";

  if (!userKey || !ideaId) {
    return json({ error: "userKey and ideaId are required" }, 400);
  }

  await ensureSchema();
  const sql = getSql();
  await sql`
    DELETE FROM saved_ideas
    WHERE user_key = ${userKey} AND idea_id = ${ideaId}
  `;

  return json({ storage: "neon", deleted: true });
}
