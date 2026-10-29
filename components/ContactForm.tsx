'use client';

import { useState } from 'react';
import { CONTACT_EMAIL, GAME } from '@/lib/site';

const TOPICS = ['Bug report', 'Feedback', 'Feature idea', 'Business', 'Other'];

/**
 * There is no server, so the form opens the visitor's email app with the
 * message filled in.
 */
export function ContactForm() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const topic = String(data.get('topic') ?? 'Other');
    const message = String(data.get('message') ?? '').trim();
    const subject = `${GAME.name} – ${topic}`;
    const body = `${message}\n\n—\nName: ${name}\nEmail: ${email}`;
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const field =
    'mt-1.5 w-full rounded-xl border border-line bg-bg px-4 py-3 text-text placeholder:text-muted/60 outline-none transition focus:border-aura focus:ring-2 focus:ring-aura/30';

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-line bg-panel p-5 sm:p-7">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-bold text-muted">
          Your name
          <input name="name" required autoComplete="name" className={field} placeholder="Your name" />
        </label>
        <label className="block text-sm font-bold text-muted">
          Your email
          <input name="email" type="email" required autoComplete="email" className={field} placeholder="you@example.com" />
        </label>
      </div>
      <label className="mt-4 block text-sm font-bold text-muted">
        Topic
        <select name="topic" className={field} defaultValue="Feedback">
          {TOPICS.map(t => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </label>
      <label className="mt-4 block text-sm font-bold text-muted">
        Message
        <textarea
          name="message"
          required
          rows={6}
          className={field}
          placeholder="Tell us what happened, or what you'd love to see next. For bugs, include your phone model."
        />
      </label>
      <button
        type="submit"
        className="mt-5 w-full rounded-xl bg-red px-6 py-3.5 font-bold text-white shadow-[0_0_24px_rgb(232_73_47/0.4)] transition hover:brightness-110 sm:w-auto"
      >
        Send message
      </button>
      <p className="mt-3 text-xs text-muted" aria-live="polite">
        {sent
          ? 'Your email app should open with the message ready — just press send.'
          : 'This opens your email app with the message filled in.'}
      </p>
    </form>
  );
}
