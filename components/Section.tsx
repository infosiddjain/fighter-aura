export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  className = '',
}: {
  id?: string;
  eyebrow: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 ${className}`}>
      <p className="font-display text-xs tracking-[0.3em] text-aura">{eyebrow}</p>
      <h2 className="mt-2 font-display text-3xl leading-tight text-text sm:text-4xl">{title}</h2>
      {intro && <p className="mt-3 max-w-2xl text-base leading-7 text-muted">{intro}</p>}
      <div className="mt-10">{children}</div>
    </section>
  );
}
