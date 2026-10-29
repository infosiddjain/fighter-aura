'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { SCREENSHOTS } from '@/lib/site';

/** Screenshot grid; click one to view it large. */
export function Gallery() {
  const [index, setIndex] = useState<number | null>(null);
  const close = useCallback(() => setIndex(null), []);
  const go = useCallback(
    (d: number) =>
      setIndex(i => (i === null ? i : (i + d + SCREENSHOTS.length) % SCREENSHOTS.length)),
    [],
  );

  useEffect(() => {
    if (index === null) {
      return;
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [index, close, go]);

  const current = index === null ? null : SCREENSHOTS[index];

  return (
    <>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SCREENSHOTS.map((s, i) => (
          <li key={s.src}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              className="group block w-full overflow-hidden rounded-2xl border border-line bg-panel text-left transition hover:-translate-y-1 hover:border-aura/70 hover:shadow-[0_10px_40px_-10px_rgb(255_106_43/0.5)]"
            >
              <Image
                src={s.src}
                alt={s.alt}
                width={1400}
                height={630}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="aspect-[20/9] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
              />
              <span className="block px-4 py-3 text-sm text-muted">{s.alt}</span>
            </button>
          </li>
        ))}
      </ul>

      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.alt}
          onClick={close}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-3 sm:p-8"
        >
          <figure className="relative w-full max-w-6xl" onClick={e => e.stopPropagation()}>
            <Image
              src={current.src}
              alt={current.alt}
              width={1400}
              height={630}
              sizes="100vw"
              className="h-auto w-full rounded-xl border border-line"
            />
            <figcaption className="mt-3 text-center text-sm text-muted">
              {current.alt} · {index! + 1}/{SCREENSHOTS.length}
            </figcaption>
            <div className="mt-3 flex justify-center gap-3">
              <button type="button" onClick={() => go(-1)} className="rounded-lg border border-line px-4 py-2 text-sm hover:bg-panel">
                ← Prev
              </button>
              <button type="button" onClick={close} className="rounded-lg bg-red px-4 py-2 text-sm font-bold">
                Close
              </button>
              <button type="button" onClick={() => go(1)} className="rounded-lg border border-line px-4 py-2 text-sm hover:bg-panel">
                Next →
              </button>
            </div>
          </figure>
        </div>
      )}
    </>
  );
}
