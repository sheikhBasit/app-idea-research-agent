export async function GET(request) {
  const requestUrl = new URL(request.url);
  const target = new URL("/api/daily-ideas?daily=1&refresh=1", requestUrl.origin);
  const response = await fetch(target, { cache: "no-store" });
  const data = await response.json();

  return Response.json({
    ok: response.ok,
    renewedAt: new Date().toISOString(),
    storage: data.storage,
    currentBoard: data.currentBoard
      ? {
          id: data.currentBoard.id,
          boardDate: data.currentBoard.boardDate,
          summary: data.currentBoard.summary,
          source: data.currentBoard.source
        }
      : null
  }, { status: response.ok ? 200 : 500 });
}
