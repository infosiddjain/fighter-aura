'use client';

import { useActionState, useEffect, useRef } from 'react';
import { sendContact } from '@/app/actions/contact';
import type { ContactField, ContactState } from '@/app/actions/contact';
import { CONTACT_EMAIL } from '@/lib/site';

const TOPICS = ['Bug report', 'Feedback', 'Feature idea', 'Business', 'Other'];
const INITIAL: ContactState = { status: 'idle' };

export function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContact, INITIAL);
  const formRef = useRef<HTMLFormElement>(null);

  // Put the cursor in the field that needs fixing
  useEffect(() => {
    if (state.status === 'error' && state.field) {
      formRef.current?.querySelector<HTMLElement>(`[name="${state.field}"]`)?.focus();
    }
  }, [state]);

  const v = state.status === 'error' ? state.values ?? {} : {};
  const invalid = (f: ContactField) => state.status === 'error' && state.field === f;
  const field = (f: ContactField) =>
    `mt-1.5 w-full rounded-xl border bg-bg px-4 py-3 text-text placeholder:text-muted/60 outline-none transition focus:ring-2 ${
      invalid(f) ? 'border-red focus:border-red focus:ring-red/30' : 'border-line focus:border-aura focus:ring-aura/30'
    }`;

  if (state.status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-[#7dff5a]/40 bg-panel p-8 text-center sm:p-12">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-[#7dff5a]/15 text-3xl" aria-hidden="true">
          ✓
        </span>
        <h2 className="mt-4 font-display text-2xl text-text">Message sent!</h2>
        <p className="mt-2 max-w-sm text-muted" role="status">
          {state.message}
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-6 rounded-xl border border-line px-5 py-2.5 text-sm font-bold text-text transition hover:border-aura hover:text-aura"
        >
          Send another message
        </button>
      </div>
    );
  }

  // key resets the form fields to the saved values after each error
  const formKey = state.status === 'error' ? JSON.stringify(state.values) + state.message : 'new';

  return (
    <form
      key={formKey}
      ref={formRef}
      action={formAction}
      className="rounded-2xl border border-line bg-panel p-5 sm:p-7"
      noValidate
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-bold text-muted">
          Your name
          <input
            name="name"
            required
            maxLength={100}
            autoComplete="name"
            defaultValue={v.name}
            aria-invalid={invalid('name')}
            className={field('name')}
            placeholder="Your name"
          />
        </label>
        <label className="block text-sm font-bold text-muted">
          Your email
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            defaultValue={v.email}
            aria-invalid={invalid('email')}
            className={field('email')}
            placeholder="you@example.com"
          />
        </label>
      </div>
      <label className="mt-4 block text-sm font-bold text-muted">
        Topic
        <select name="topic" className={field('topic')} defaultValue={v.topic ?? 'Feedback'}>
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
          maxLength={5000}
          defaultValue={v.message}
          aria-invalid={invalid('message')}
          className={field('message')}
          placeholder="Tell us what happened, or what you'd love to see next. For bugs, include your phone model."
        />
      </label>

      {/* Spam trap: hidden from people, bots fill it in */}
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      {state.status === 'error' && (
        <p role="alert" className="mt-4 rounded-xl border border-red/50 bg-red/10 px-4 py-3 text-sm font-bold text-[#ff8a75]">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red px-6 py-3.5 font-bold text-white shadow-[0_0_24px_rgb(232_73_47/0.4)] transition hover:brightness-110 disabled:cursor-wait disabled:opacity-70 sm:w-auto"
      >
        {pending && (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden="true" />
        )}
        {pending ? 'Sending…' : 'Send message'}
      </button>
      <p className="mt-3 text-xs text-muted">
        Prefer email? Write to{' '}
        <a href={`mailto:${CONTACT_EMAIL}`} className="font-bold text-text hover:text-aura">
          {CONTACT_EMAIL}
        </a>
        .
      </p>
    </form>
  );
}
