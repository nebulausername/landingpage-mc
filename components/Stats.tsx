'use client';

import { useRef } from 'react';
import { useLang } from '@/lib/providers';
import { useCountUp } from '@/lib/hooks';

export default function Stats() {
  const { t } = useLang();
  return (
    <section className="bg-cream-soft border-y border-paper-edge py-12 sm:py-16">
      <div className="max-w-wrap mx-auto px-4 sm:px-6 grid grid-cols-2 lg:grid-cols-4 gap-8">
        <Stat target={6}      label={t.stats.running}   suffix={t.stats.yrs_suffix}      decimal={0}/>
        <Stat target={48720}  label={t.stats.lifetime}  formatter={n => n.toLocaleString()}/>
        <Stat target={2.4}    label={t.stats.explored}  suffix={t.stats.chunks_suffix}   decimal={1}/>
        <Stat target={99.9}   label={t.stats.uptime}    suffix="%"                       decimal={1}/>
      </div>
    </section>
  );
}

interface StatProps {
  target: number;
  label: string;
  suffix?: string;
  decimal?: number;  // For numbers shown with decimal (e.g. 99.9%)
  formatter?: (n: number) => string;
}
function Stat({ target, label, suffix, decimal = 0, formatter }: StatProps) {
  const ref = useRef<HTMLDivElement>(null);
  // Multiply by 10 for decimals to use integer animation, then divide
  const scale = Math.pow(10, decimal);
  const animTarget = Math.round(target * scale);
  const animated = useCountUp(animTarget, ref);
  // The "true" current value, accounting for decimal scaling
  const trueValue = decimal ? animated / scale : animated;
  // Final display: formatter wins if provided, else use toFixed for decimals, else raw
  const display = formatter ? formatter(trueValue) : (decimal ? trueValue.toFixed(decimal) : trueValue);
  return (
    <div ref={ref} className="flex flex-col gap-1">
      <span className="font-display text-4xl sm:text-5xl font-medium tabular">
        {display}{suffix && <span className="text-bark-muted text-2xl sm:text-3xl ml-1">{suffix}</span>}
      </span>
      <span className="text-sm text-bark-muted">{label}</span>
    </div>
  );
}
