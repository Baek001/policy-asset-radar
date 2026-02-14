import { ingestLiveFeedToDb } from '../../../lib/pipeline';

export const dynamic = 'force-dynamic';

export async function GET() {
  const result = await ingestLiveFeedToDb();
  return Response.json(result, { status: result.ok ? 200 : 500 });
}

export async function POST() {
  const result = await ingestLiveFeedToDb();
  return Response.json(result, { status: result.ok ? 200 : 500 });
}
