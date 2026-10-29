import type { Metadata } from 'next';
import { ContactForm } from '@/components/ContactForm';
import { SocialLinks } from '@/components/SocialLinks';
import { CONTACT_EMAIL, DEVELOPER, GAME } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact us',
  description: `Get in touch about ${GAME.name}: bug reports, feedback and ideas.`,
};

const FAQ = [
  {
    q: 'Is Fighter Aura free?',
    a: 'Yes. The game is completely free, with no ads and no in-app purchases.',
  },
  {
    q: 'Does it need the internet?',
    a: 'No. Everything runs on your phone and works offline.',
  },
  {
    q: 'Is there an iPhone version?',
    a: 'Not yet — Fighter Aura is on Android for now. Let us know if you want it on iOS.',
  },
  {
    q: 'How do I report a bug?',
    a: 'Use the form with the “Bug report” topic and include your phone model and what happened.',
  },
];

export default function ContactPage() {
  return (
    <div className="aura-bg pt-16">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <p className="font-display text-xs tracking-[0.3em] text-aura">CONTACT</p>
        <h1 className="mt-2 font-display text-4xl text-text sm:text-5xl">Let’s talk</h1>
        <p className="mt-3 max-w-2xl text-muted">
          Found a bug, have an idea for a new fighter, or just want to say hi? Send a message and{' '}
          {DEVELOPER.name.split(' ')[0]} will get back to you.
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <ContactForm />

          <aside className="space-y-4">
            <div className="rounded-2xl border border-line bg-panel p-6">
              <h2 className="font-display text-sm tracking-[0.25em] text-gold">EMAIL</h2>
              <a href={`mailto:${CONTACT_EMAIL}`} className="mt-2 block break-all text-lg font-bold text-text hover:text-aura">
                {CONTACT_EMAIL}
              </a>
              <p className="mt-1 text-sm text-muted">Usually replies within a couple of days.</p>
            </div>
            <div className="rounded-2xl border border-line bg-panel p-6">
              <h2 className="font-display text-sm tracking-[0.25em] text-gold">FOLLOW</h2>
              <p className="mt-2 text-sm text-muted">Updates, new fighters and behind-the-scenes.</p>
              <div className="mt-4">
                <SocialLinks />
              </div>
            </div>
            <div className="rounded-2xl border border-line bg-panel p-6">
              <h2 className="font-display text-sm tracking-[0.25em] text-gold">DEVELOPER</h2>
              <p className="mt-2 font-bold text-text">{DEVELOPER.name}</p>
              <p className="text-sm text-muted">{DEVELOPER.role}</p>
              <p className="text-sm text-muted">{DEVELOPER.location}</p>
            </div>
          </aside>
        </div>

        <section className="mt-16">
          <h2 className="font-display text-2xl text-text">Questions</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {FAQ.map(f => (
              <details key={f.q} className="group rounded-2xl border border-line bg-panel p-5 open:border-aura/60">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-text">
                  {f.q}
                  <span className="text-aura transition group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <p className="mt-3 text-sm leading-6 text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
