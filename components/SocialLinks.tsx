import { SOCIALS } from '@/lib/site';
import { SocialIcon } from './SocialIcon';

export function SocialLinks({ size = 'md' }: { size?: 'sm' | 'md' }) {
  const box = size === 'sm' ? 'h-9 w-9' : 'h-11 w-11';
  const icon = size === 'sm' ? 'h-4 w-4' : 'h-5 w-5';
  return (
    <ul className="flex flex-wrap gap-2">
      {SOCIALS.map(s => (
        <li key={s.id}>
          <a
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            title={s.label}
            className={`${box} grid place-items-center rounded-xl border border-white/10 bg-white/5 text-zinc-200 transition hover:-translate-y-0.5 hover:border-aura hover:text-aura`}
          >
            <SocialIcon id={s.id} className={icon} />
          </a>
        </li>
      ))}
    </ul>
  );
}
