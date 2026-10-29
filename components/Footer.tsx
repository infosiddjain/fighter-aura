import Link from 'next/link';
import { CONTACT_EMAIL, DEVELOPER, GAME } from '@/lib/site';
import { Logo } from './Navbar';
import { SocialLinks } from './SocialLinks';

export function Footer() {
  return (
    <footer className="border-t border-line/60 bg-panel/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-3 max-w-sm text-sm leading-6 text-muted">{GAME.description}</p>
          <div className="mt-4">
            <SocialLinks size="sm" />
          </div>
        </div>
        <div>
          <h3 className="font-display text-sm tracking-widest text-gold">GAME</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li><Link href="/#features" className="hover:text-text">Features</Link></li>
            <li><Link href="/#fighters" className="hover:text-text">Fighters</Link></li>
            <li><Link href="/#moves" className="hover:text-text">Move list</Link></li>
            <li><a href={GAME.apkUrl} download className="hover:text-text">Download APK</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-display text-sm tracking-widest text-gold">INFO</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li><Link href="/#developer" className="hover:text-text">Developer</Link></li>
            <li><Link href="/contact" className="hover:text-text">Contact us</Link></li>
            <li><Link href="/privacy" className="hover:text-text">Privacy policy</Link></li>
            <li>
              <a href={`mailto:${CONTACT_EMAIL}`} className="break-all hover:text-text">
                {CONTACT_EMAIL}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line/60">
        <p className="mx-auto max-w-6xl px-4 py-5 text-xs text-muted sm:px-6">
          © 2026 {GAME.name} · Made by {DEVELOPER.name} · v{GAME.version}
        </p>
      </div>
    </footer>
  );
}
