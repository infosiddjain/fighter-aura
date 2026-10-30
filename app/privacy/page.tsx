import type { Metadata } from 'next';
import Link from 'next/link';
import { CONTACT_EMAIL, DEVELOPER, GAME } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy policy',
  description: `How ${GAME.name} handles your information.`,
};

const SECTIONS: { title: string; body: React.ReactNode }[] = [
  {
    title: 'Information we collect',
    body: (
      <>
        The game does not collect, store or share any personal information. It does not ask you to
        create an account and does not access your contacts, location, camera, microphone or files.
      </>
    ),
  },
  {
    title: 'Data stored on your device',
    body: (
      <>
        The game saves your settings (music, sound effects, vibration, difficulty and rounds) on your
        device only, so they are remembered next time. This data never leaves your device and is
        removed when you uninstall the game.
      </>
    ),
  },
  {
    title: 'Permissions',
    body: (
      <>
        The app asks for vibration access so your phone can buzz on big hits — you can turn this off
        in Settings. It does not need the internet to play.
      </>
    ),
  },
  {
    title: 'Ads, analytics and third parties',
    body: (
      <>
        The game shows no ads and uses no analytics or tracking tools, and sends no data to third
        parties. This website does not use cookies or tracking either.
      </>
    ),
  },
  {
    title: 'Contact form and email',
    body: (
      <>
        When you send the contact form, your name, email, topic and message are delivered to our
        inbox through Hub Form (hub-form.vercel.app), a form-delivery service. We use them only to
        reply to you and never sell or share them with anyone else. If you email us directly, the
        same applies. To have your messages deleted, email us and we will remove them.
      </>
    ),
  },
  {
    title: 'Children’s privacy',
    body: (
      <>
        The game is suitable for all ages and does not knowingly collect any information from
        children.
      </>
    ),
  },
  {
    title: 'Changes to this policy',
    body: (
      <>
        If this policy changes, the updated version will be posted on this page and in the game, with
        a new “Last updated” date.
      </>
    ),
  },
  {
    title: 'Contact',
    body: (
      <>
        Questions about this policy? Email{' '}
        <a href={`mailto:${CONTACT_EMAIL}`} className="font-bold text-aura hover:underline">
          {CONTACT_EMAIL}
        </a>{' '}
        or use the{' '}
        <Link href="/contact" className="font-bold text-aura hover:underline">
          contact page
        </Link>
        .
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <div className="pt-16">
      <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
        <p className="font-display text-xs tracking-[0.3em] text-aura">LEGAL</p>
        <h1 className="mt-2 font-display text-4xl text-text sm:text-5xl">Privacy policy</h1>
        <p className="mt-3 text-sm text-muted">Last updated: {GAME.lastUpdated}</p>
        <p className="mt-6 leading-7 text-text/90">
          This policy explains how {GAME.name} (“the game”), developed by {DEVELOPER.name} (“we”),
          handles your information. In short: we don’t collect any.
        </p>

        <nav aria-label="On this page" className="mt-8 rounded-2xl border border-line bg-panel p-5">
          <p className="text-xs font-bold tracking-widest text-muted">ON THIS PAGE</p>
          <ol className="mt-2 grid gap-1 text-sm sm:grid-cols-2">
            {SECTIONS.map((s, i) => (
              <li key={s.title}>
                <a href={`#s${i + 1}`} className="text-text/80 hover:text-aura">
                  {i + 1}. {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {SECTIONS.map((s, i) => (
          <section key={s.title} id={`s${i + 1}`} className="mt-10">
            <h2 className="font-display text-xl text-gold">
              {i + 1}. {s.title}
            </h2>
            <p className="mt-2 leading-7 text-text/90">{s.body}</p>
          </section>
        ))}
      </article>
    </div>
  );
}
