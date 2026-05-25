'use client';

import { useEffect, useState } from 'react';
import type { RefObject } from 'react';
import { config } from './config';
import type { ServerStatus } from './types';

/* Hook: fetch live status from mcsrvstat.us-compatible API, fall back to config */
export function useServerStatus(): ServerStatus {
  const [status, setStatus] = useState<ServerStatus>({
    online: true,
    players: config.fallback.players,
    maxPlayers: config.fallback.maxPlayers,
    version: config.server.version,
  });

  useEffect(() => {
    if (!config.server.statusApi) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(config.server.statusApi!);
        if (!res.ok) throw new Error('status failed');
        const data = await res.json();
        if (cancelled) return;
        if (data?.online) {
          setStatus({
            online: true,
            players: data.players?.online ?? config.fallback.players,
            maxPlayers: data.players?.max ?? config.fallback.maxPlayers,
            version: data.version ?? config.server.version,
          });
        }
      } catch {
        // Silent fallback — config values stay
      }
    })();
    return () => { cancelled = true; };
  }, []);

  return status;
}

/* Hook: animate a number from 0 to target when element enters viewport */
export function useCountUp(target: number, ref: RefObject<HTMLElement>, durationMs = 1800) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    let raf = 0;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / durationMs);
            const eased = 1 - Math.pow(1 - t, 3);
            setValue(Math.round(target * eased));
            if (t < 1) raf = requestAnimationFrame(tick);
          };
          raf = requestAnimationFrame(tick);
          obs.disconnect();
        }
      });
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => { obs.disconnect(); cancelAnimationFrame(raf); };
  }, [target, ref, durationMs]);
  return value;
}
