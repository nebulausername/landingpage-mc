import { ImageResponse } from 'next/og';
import { config } from '@/lib/config';

export const runtime = 'edge';
export const alt = `${config.server.name} · Minecraft Server`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OG() {
  const tagline = config.server.tagline ?? 'A handcrafted Minecraft survival world';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%', height: '100%',
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
          background: 'linear-gradient(135deg, #f2ead3 0%, #ebe0c3 50%, #c8862e 100%)',
          padding: 80,
          fontFamily: 'system-ui',
          position: 'relative',
        }}
      >
        {/* Sun glow */}
        <div
          style={{
            position: 'absolute',
            top: 60, right: 80, width: 240, height: 240, borderRadius: 240,
            background: 'radial-gradient(circle, #e4a845 0%, rgba(228,168,69,0) 70%)',
          }}
        />
        {/* Hills silhouette */}
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 220, background: 'rgba(31,24,16,0.85)', clipPath: 'polygon(0 100%, 0 70%, 12% 50%, 25% 70%, 40% 40%, 55% 60%, 70% 35%, 85% 55%, 100% 30%, 100% 100%)' }}/>

        {/* Eyebrow */}
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', color: '#1f1810', zIndex: 2 }}>
          <div style={{ fontSize: 22, letterSpacing: 6, textTransform: 'uppercase', opacity: 0.7, fontFamily: 'monospace' }}>
            Season III · play.{config.server.ip.replace(/^play\./, '')}
          </div>
          <div style={{ fontSize: 110, fontWeight: 600, lineHeight: 1.0, marginTop: 14, letterSpacing: '-2px' }}>
            {config.server.name}
          </div>
          <div style={{ fontSize: 34, marginTop: 18, opacity: 0.78, maxWidth: 820, fontStyle: 'italic' }}>
            {tagline}.
          </div>
          <div style={{ marginTop: 28, fontSize: 22, fontFamily: 'monospace', color: '#fff', background: '#1f1810', padding: '12px 24px', borderRadius: 16, alignSelf: 'flex-start' }}>
            {config.server.ip}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
