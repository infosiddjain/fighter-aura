'use server';

import { GAME } from '@/lib/site';

const ENDPOINT = 'https://hub-form.vercel.app/api/f/n4y2a6rNpxRh';

export type ContactField = 'name' | 'email' | 'topic' | 'message';

export interface ContactState {
  status: 'idle' | 'success' | 'error';
  message?: string;
  field?: ContactField;
  /** What the visitor typed, so the form can be refilled after an error */
  values?: Partial<Record<ContactField, string>>;
}

const TOPICS = ['Bug report', 'Feedback', 'Feature idea', 'Business', 'Other'];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Sends the contact form to Hub Form. The secret key never leaves the server. */
export async function sendContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const values = {
    name: String(formData.get('name') ?? '').trim(),
    email: String(formData.get('email') ?? '').trim(),
    topic: String(formData.get('topic') ?? 'Other'),
    message: String(formData.get('message') ?? '').trim(),
  };
  const fail = (message: string, field?: ContactField): ContactState => ({
    status: 'error',
    message,
    field,
    values,
  });

  // Spam trap: real visitors never see this field, bots fill it in
  if (String(formData.get('_gotcha') ?? '') !== '') {
    return { status: 'success', message: 'Thanks! Your message has been sent.' };
  }

  if (values.name.length < 2) return fail('Please enter your name.', 'name');
  if (values.name.length > 100) return fail('That name is a bit long.', 'name');
  if (!EMAIL_RE.test(values.email)) return fail('Please enter a valid email address.', 'email');
  if (!TOPICS.includes(values.topic)) values.topic = 'Other';
  if (values.message.length < 10) return fail('Please write a little more (at least 10 characters).', 'message');
  if (values.message.length > 5000) return fail('Message is too long (max 5000 characters).', 'message');

  const key = process.env.HUB_KEY;
  if (!key) {
    console.error('[contact] HUB_KEY is not set');
    return fail('The contact form is not set up yet. Please email us instead.');
  }

  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        ...values,
        subject: `${GAME.name} – ${values.topic}`,
        source: 'fighter-aura website',
      }),
      cache: 'no-store',
      signal: AbortSignal.timeout(10_000),
    });
    const data = (await res.json().catch(() => null)) as
      | { ok: true }
      | { ok: false; code?: string; error?: string; field?: string }
      | null;

    if (res.ok && data?.ok) {
      return { status: 'success', message: 'Thanks! Your message has been sent. We’ll reply soon.' };
    }
    const problem = data && !data.ok ? data : null;
    const field = (['name', 'email', 'topic', 'message'] as const).find(f => f === problem?.field);
    const error = problem?.error ?? 'Something went wrong. Please try again.';
    console.error('[contact] Hub Form rejected the message', res.status, problem?.code ?? '');
    return fail(error, field);
  } catch (err) {
    console.error('[contact] could not reach Hub Form', err);
    return fail('Could not send right now. Please check your connection and try again.');
  }
}
