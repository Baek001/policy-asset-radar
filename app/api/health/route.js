import { fetchLiveFeed } from '../../../lib/live';

export const dynamic = 'force-dynamic';

export async function GET() {
  const env = {
    supabaseUrl: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
    supabaseAnon: Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
    gnews: Boolean(process.env.GNEWS_API_KEY),
    naverId: Boolean(process.env.NAVER_CLIENT_ID),
    naverSecret: Boolean(process.env.NAVER_CLIENT_SECRET),
  };

  let feedCount = 0;
  try {
    const feed = await fetchLiveFeed();
    feedCount = feed.length;
  } catch {}

  return Response.json({
    ok: true,
    env,
    feedCount,
    checkedAt: new Date().toISOString(),
  });
}
