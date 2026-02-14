import { fetchLiveFeed } from '../../../lib/live';
import { assetExposureFromEvent, livingImpactFromTags } from '../../../lib/core';

export const dynamic = 'force-dynamic';

export async function GET() {
  const feed = await fetchLiveFeed();
  const top = feed.slice(0, 5).map((e) => {
    const exposure = assetExposureFromEvent({ title: e.title, tags: e.tags }).slice(0, 2);
    const living = livingImpactFromTags(e.tags || []);
    return {
      title: e.title,
      region: e.region,
      type: e.type,
      impact_level: e.impact_level,
      exposure,
      living,
      evidence: (e.evidence || []).slice(0, 2),
      source_url: e.source_url,
    };
  });

  return Response.json({
    ok: true,
    generatedAt: new Date().toISOString(),
    top,
  });
}
