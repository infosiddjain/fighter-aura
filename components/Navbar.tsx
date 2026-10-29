'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { GAME, NAV_LINKS } from '@/lib/site';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label={`${GAME.name} home`}>
      <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-gold to-red font-display text-sm text-white shadow-[0_0_20px_rgb(255_106_43/0.5)]">
        FA
      </span>
      <span className="font-display text-lg tracking-wider text-text">
        FIGHTER <span className="text-aura">AURA</span>
      </span>
    </Link>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors ${
        scrolled || open ? 'border-b border-line/60 bg-bg/85 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo />

        <ul className="hidden items-center gap-6 text-sm text-muted lg:flex">
          {NAV_LINKS.map(l => (
            <li key={l.href}>
              <Link href={l.href} className="transition hover:text-text">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={GAME.apkUrl}
            download
            className="hidden rounded-lg bg-red px-4 py-2 text-sm font-bold text-white shadow-[0_0_20px_rgb(232_73_47/0.45)] transition hover:brightness-110 sm:inline-block"
          >
            Download APK
          </a>
          <button
            type="button"
            onClick={() => setOpen(o => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="grid h-10 w-10 place-items-center rounded-lg border border-line text-text lg:hidden"
          >
            <span className="relative block h-3.5 w-5">
              <span className={`absolute left-0 h-0.5 w-5 bg-current transition ${open ? 'top-1.5 rotate-45' : 'top-0'}`} />
              <span className={`absolute left-0 top-1.5 h-0.5 w-5 bg-current transition ${open ? 'opacity-0' : ''}`} />
              <span className={`absolute left-0 h-0.5 w-5 bg-current transition ${open ? 'top-1.5 -rotate-45' : 'top-3'}`} />
            </span>
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-line/60 px-4 pb-5 pt-2 lg:hidden">
          <ul className="flex flex-col">
            {NAV_LINKS.map(l => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 text-base text-muted hover:bg-panel hover:text-text"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={GAME.apkUrl}
            download
            className="mt-3 block rounded-lg bg-red px-4 py-3 text-center font-bold text-white"
          >
            Download APK · {GAME.apkSize}
          </a>
        </div>
      )}
    </header>
  );
}
