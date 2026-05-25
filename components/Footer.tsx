'use client';

import { useLang } from '@/lib/providers';
import { config } from '@/lib/config';

export default function Footer() {
  const { t } = useLang();
  const f = t.footer;

  return (
    <footer className="bg-cream-soft border-t border-paper-edge pt-16 pb-8">
      <div className="max-w-wrap mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-10 mb-12">
          {/* Brand block */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 font-display text-xl mb-4">
              <svg viewBox="0 0 40 40" width="28" height="28">
                <path d="M20 4 L36 13 L20 22 L4 13 Z" fill="rgb(var(--c-moss))"/>
                <path d="M4 13 L20 22 L20 36 L4 27 Z" fill="rgb(var(--c-amber))" opacity="0.85"/>
                <path d="M36 13 L20 22 L20 36 L36 27 Z" fill="rgb(var(--c-bark-soft))"/>
              </svg>
              <span className="font-medium">{config.server.name}</span>
            </div>
            <p className="text-bark-soft text-sm leading-relaxed max-w-xs mb-5">{f.tag}</p>

            {/* IP block */}
            <div className="bg-paper border border-paper-edge rounded-lg px-3 py-2 inline-flex items-center gap-2 font-mono text-xs">
              <span className="text-bark-muted">IP</span>
              <span>{config.server.ip}</span>
            </div>
          </div>

          {/* Explore column */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-[0.16em] text-bark-muted mb-4">{f.explore}</h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li><a href="#worlds"   className="hover:text-moss-dark transition-colors">{t.nav.worlds}</a></li>
              <li><a href="#features" className="hover:text-moss-dark transition-colors">{t.nav.realm}</a></li>
              <li><a href="#gallery"  className="hover:text-moss-dark transition-colors">{f.gallery}</a></li>
              <li><a href="#roadmap"  className="hover:text-moss-dark transition-colors">{f.roadmap}</a></li>
              <li><a href="#faq"      className="hover:text-moss-dark transition-colors">{t.nav.faq}</a></li>
            </ul>
          </div>

          {/* Realm column */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-[0.16em] text-bark-muted mb-4">{f.realm}</h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li><a href="#ranks"        className="hover:text-moss-dark transition-colors">{t.nav.ranks}</a></li>
              <li><a href="#staff"        className="hover:text-moss-dark transition-colors">{f.staff}</a></li>
              <li><a href="#testimonials" className="hover:text-moss-dark transition-colors">{t.nav.community}</a></li>
              <li><a href="#newsletter"   className="hover:text-moss-dark transition-colors">Newsletter</a></li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-[0.16em] text-bark-muted mb-4">{f.community}</h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li><a href={config.social.discord} target="_blank" rel="noopener noreferrer" className="hover:text-moss-dark transition-colors">{f.discord}</a></li>
              <li><a href="#vote" className="hover:text-moss-dark transition-colors">{f.vote}</a></li>
              <li><a href="#" className="hover:text-moss-dark transition-colors">{f.forums}</a></li>
              <li><a href="#" className="hover:text-moss-dark transition-colors">{f.map}</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-[0.16em] text-bark-muted mb-4">{f.legal}</h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li><a href="#" className="hover:text-moss-dark transition-colors">{f.privacy}</a></li>
              <li><a href="#" className="hover:text-moss-dark transition-colors">{f.terms}</a></li>
              <li><a href="#" className="hover:text-moss-dark transition-colors">{f.refund}</a></li>
              <li><a href="#" className="hover:text-moss-dark transition-colors">{f.eula}</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-paper-edge flex flex-wrap items-center justify-between gap-3 text-xs text-bark-muted">
          <p className="font-mono">{f.copyright}</p>
          <p className="italic font-display">{f.made}</p>
        </div>
      </div>
    </footer>
  );
}
