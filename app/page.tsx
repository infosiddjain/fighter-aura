import Image from 'next/image';
import Link from 'next/link';
import { FighterArt } from '@/components/FighterArt';
import { Gallery } from '@/components/Gallery';
import { Section } from '@/components/Section';
import { SocialLinks } from '@/components/SocialLinks';
import {
  CONTACT_EMAIL,
  DEVELOPER,
  FEATURES,
  FIGHTERS,
  GAME,
  LEVEL_COLORS,
  MODES,
  MOVES,
  PLATFORM_FACTS,
  STATS,
} from '@/lib/site';

function DownloadButton({ big = false }: { big?: boolean }) {
  return (
    <a
      href={GAME.apkUrl}
      download
      className={`inline-flex items-center justify-center gap-3 rounded-xl bg-red font-bold text-white shadow-[0_0_30px_rgb(232_73_47/0.5)] transition hover:-translate-y-0.5 hover:brightness-110 ${
        big ? 'px-7 py-4 text-lg' : 'px-6 py-3.5'
      }`}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
        <path d="M17.6 9.48 19.44 6.3a.38.38 0 0 0-.66-.38l-1.86 3.22a11.5 11.5 0 0 0-9.84 0L5.22 5.92a.38.38 0 0 0-.66.38L6.4 9.48A10.8 10.8 0 0 0 1 18h22a10.8 10.8 0 0 0-5.4-8.52ZM7 15.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Zm10 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Z" />
      </svg>
      Download for Android
    </a>
  );
}

function StatBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex items-center gap-3 text-xs">
      <span className="w-14 font-bold text-muted">{label}</span>
      <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-panel-2">
        <span className="block h-full rounded-full" style={{ width: `${value}%`, background: color }} />
      </span>
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="aura-bg relative overflow-hidden pt-16">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 overflow-hidden" aria-hidden="true">
          <div className="floor-grid absolute inset-x-[-50%] top-0 h-[200%]" />
        </div>
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1fr_1.15fr]">
          <div className="text-center lg:text-left">
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-panel/70 px-3 py-1 text-xs text-muted">
              <span className="h-2 w-2 rounded-full bg-[#7dff5a]" /> Free · Offline · No ads
            </p>
            <h1 className="mt-5 font-display text-5xl leading-none sm:text-6xl lg:text-7xl">
              <span className="text-aura-gradient">FIGHTER AURA</span>
            </h1>
            <p className="mt-4 font-display text-lg tracking-[0.25em] text-muted sm:text-xl">
              UNLEASH YOUR AURA
            </p>
            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-muted lg:mx-0 sm:text-lg">
              Chain combos, launch rivals into the air, and finish them with a cinematic
              super. A 2.5D fighting game built for your phone.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <DownloadButton big />
              <Link
                href="#moves"
                className="rounded-xl border border-line px-6 py-4 font-bold text-text transition hover:border-aura hover:text-aura"
              >
                See the moves
              </Link>
            </div>
            <p className="mt-3 text-xs text-muted">
              v{GAME.version} · {GAME.apkSize} · {GAME.minAndroid}
            </p>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-[2rem] bg-aura/20 blur-3xl" aria-hidden="true" />
            {/* Landscape phone frame */}
            <div className="relative rounded-[1.75rem] border-[6px] border-[#2a2238] bg-black p-1 shadow-2xl sm:border-[10px]">
              <Image
                src="/screens/super.jpg"
                alt="AURA RUSH super move in Fighter Aura"
                width={1400}
                height={630}
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="aspect-[20/9] w-full rounded-2xl object-cover"
              />
            </div>
            <div className="animate-float absolute -bottom-16 -left-4 hidden w-24 sm:block lg:-bottom-20 lg:-left-16 lg:w-32">
              <FighterArt fighter={FIGHTERS[0]} />
            </div>
            <div className="animate-float absolute -bottom-16 -right-4 hidden w-24 [animation-delay:1.2s] sm:block lg:-bottom-20 lg:-right-14 lg:w-32">
              <FighterArt fighter={FIGHTERS[1]} facing={-1} />
            </div>
          </div>
        </div>

        <ul className="relative mx-auto grid max-w-4xl grid-cols-2 gap-3 px-4 pb-16 sm:grid-cols-4 sm:px-6">
          {STATS.map(s => (
            <li key={s.label} className="rounded-2xl border border-line bg-panel/70 p-4 text-center backdrop-blur">
              <p className="font-display text-3xl text-gold">{s.value}</p>
              <p className="text-xs tracking-widest text-muted">{s.label.toUpperCase()}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- Features ---------- */}
      <Section
        id="features"
        eyebrow="WHY YOU'LL LOVE IT"
        title="Real fighting game depth, made for touch"
        intro="Everything you expect from a console fighter — combos, mix-ups, juggles and supers — tuned for thumbs and short sessions."
      >
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(f => (
            <li
              key={f.title}
              className="rounded-2xl border border-line bg-panel p-6 transition hover:-translate-y-1 hover:border-aura/60"
            >
              <span className="text-3xl" aria-hidden="true">{f.icon}</span>
              <h3 className="mt-3 font-display text-lg text-text">{f.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{f.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* ---------- Fighters ---------- */}
      <div className="border-y border-line/60 bg-panel/30">
        <Section
          id="fighters"
          eyebrow="THE ROSTER"
          title="Five fighters. Five styles."
          intro="Each fighter has their own speed, power, reach and health. Pick the one that fits how you play."
        >
          <ul className="grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {FIGHTERS.map(f => (
              <li
                key={f.name}
                className="group rounded-2xl border-2 bg-panel p-4 transition hover:-translate-y-1"
                style={{ borderColor: f.colors.aura, boxShadow: `0 0 24px -8px ${f.colors.aura}` }}
              >
                <FighterArt fighter={f} className="mx-auto h-40 w-full transition duration-300 group-hover:scale-105" />
                <h3 className="mt-2 font-display text-xl tracking-widest" style={{ color: f.colors.aura }}>
                  {f.name}
                </h3>
                <p className="mb-3 text-sm text-muted">{f.title}</p>
                <div className="space-y-1.5">
                  <StatBar label="POWER" value={f.power} color={f.colors.aura} />
                  <StatBar label="SPEED" value={f.speed} color={f.colors.aura} />
                  <StatBar label="HEALTH" value={f.health} color={f.colors.aura} />
                </div>
              </li>
            ))}
          </ul>
        </Section>
      </div>

      {/* ---------- Moves ---------- */}
      <Section
        id="moves"
        eyebrow="MOVE LIST"
        title="Fourteen moves to master"
        intro="▶ means toward your opponent. Block high and mid attacks standing, and lows while crouching. Land hits to charge your AURA."
      >
        <ul className="grid gap-3 md:grid-cols-2">
          {MOVES.map(m => (
            <li
              key={m.name}
              className={`flex items-center gap-4 rounded-xl border px-4 py-3 ${
                m.level === 'SPECIAL' ? 'border-violet/60 bg-violet/10' : 'border-line bg-panel'
              }`}
            >
              <span className="w-28 shrink-0 font-display text-sm text-gold sm:w-32">{m.input}</span>
              <span className="min-w-0 flex-1">
                <span className="block font-bold text-text">{m.name}</span>
                {m.note && <span className="block truncate text-xs text-muted">{m.note}</span>}
              </span>
              <span className="shrink-0 text-[10px] font-black tracking-wider" style={{ color: LEVEL_COLORS[m.level] }}>
                {m.level}
              </span>
            </li>
          ))}
        </ul>
      </Section>

      {/* ---------- Modes ---------- */}
      <div className="border-y border-line/60 bg-panel/30">
        <Section
          id="modes"
          eyebrow="GAME MODES"
          title="Climb the ladder or jump straight in"
          intro="Choose Easy, Medium or Hard, and play best of 1, 3 or 5 rounds."
        >
          <div className="grid gap-6 md:grid-cols-2">
            {MODES.map(m => (
              <article key={m.title} className="overflow-hidden rounded-2xl border border-line bg-panel">
                <Image src={m.image} alt={m.title} width={1400} height={630} sizes="(min-width: 768px) 50vw, 100vw" className="aspect-[20/9] w-full object-cover" />
                <div className="p-6">
                  <h3 className="font-display text-xl text-text">{m.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{m.text}</p>
                </div>
              </article>
            ))}
          </div>
          <ul className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              ['EASY', 'Learn the moves. The AI rarely blocks.', '#7dff5a'],
              ['MEDIUM', 'A fair fight that punishes mistakes.', '#ffd23f'],
              ['HARD', 'Reads your attacks, anti-airs and combos.', '#ff4b4b'],
            ].map(([t, d, c]) => (
              <li key={t} className="rounded-xl border border-line bg-panel p-4">
                <p className="font-display text-sm tracking-widest" style={{ color: c }}>{t}</p>
                <p className="mt-1 text-sm text-muted">{d}</p>
              </li>
            ))}
          </ul>
        </Section>
      </div>

      {/* ---------- Gallery ---------- */}
      <Section id="gallery" eyebrow="SCREENSHOTS" title="See it in action" intro="Real in-game screenshots. Tap any image to view it full size.">
        <Gallery />
      </Section>

      {/* ---------- Download ---------- */}
      <section id="download" className="aura-bg border-y border-line/60">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-2">
          <div>
            <p className="font-display text-xs tracking-[0.3em] text-aura">GET THE GAME</p>
            <h2 className="mt-2 font-display text-3xl text-text sm:text-4xl">Ready to fight?</h2>
            <p className="mt-3 max-w-lg text-muted">
              Download the APK and install it on your Android phone. No account, no ads, no
              internet needed.
            </p>
            <div className="mt-7">
              <DownloadButton big />
            </div>
            <p className="mt-3 text-xs text-muted">
              Fighter Aura v{GAME.version} · {GAME.apkSize} · {GAME.minAndroid}
            </p>
          </div>
          <ol className="space-y-3">
            {[
              ['Download', 'Tap “Download for Android” on your phone.'],
              ['Allow install', 'If asked, allow your browser to install unknown apps.'],
              ['Install & play', 'Open the file, tap Install, then launch Fighter Aura.'],
            ].map(([t, d], i) => (
              <li key={t} className="flex gap-4 rounded-2xl border border-line bg-panel/80 p-5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gold font-display text-bg">
                  {i + 1}
                </span>
                <span>
                  <span className="block font-bold text-text">{t}</span>
                  <span className="block text-sm text-muted">{d}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- Developer ---------- */}
      <Section id="developer" eyebrow="ABOUT" title="The developer & the platform">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-2xl border border-line bg-panel p-6 text-center sm:p-8">
            <div className="mx-auto grid h-24 w-24 place-items-center rounded-full border-4 border-gold bg-gradient-to-br from-aura to-red font-display text-3xl text-white shadow-[0_0_40px_rgb(255_106_43/0.5)]">
              {DEVELOPER.initials}
            </div>
            <h3 className="mt-4 font-display text-2xl text-text">{DEVELOPER.name}</h3>
            <p className="mt-1 text-sm font-bold text-gold">{DEVELOPER.role}</p>
            <p className="mt-1 text-sm text-muted">
              {DEVELOPER.location} · {DEVELOPER.experience} experience
            </p>
            <div className="mt-5 flex justify-center">
              <SocialLinks />
            </div>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-5 inline-block break-all rounded-xl bg-red px-5 py-3 text-sm font-bold text-white transition hover:brightness-110"
            >
              ✉ {CONTACT_EMAIL}
            </a>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="font-display text-sm tracking-[0.25em] text-gold">ABOUT ME</h3>
              <p className="mt-2 leading-7 text-text/90">{DEVELOPER.bio}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {DEVELOPER.skills.map(s => (
                  <li key={s} className="rounded-full border border-line bg-panel-2 px-3 py-1 text-xs font-bold text-text">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-display text-sm tracking-[0.25em] text-gold">ABOUT THE PLATFORM</h3>
              <p className="mt-2 leading-7 text-text/90">
                {GAME.name} is a free 2.5D fighting game made for phones: smooth 60 FPS action,
                touch controls designed for thumbs, and no accounts, ads or tracking.
              </p>
              <dl className="mt-4 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-panel">
                {PLATFORM_FACTS.map(f => (
                  <div key={f.label} className="flex flex-col gap-0.5 px-5 py-3 sm:flex-row sm:gap-4">
                    <dt className="w-28 shrink-0 text-sm font-bold text-muted">{f.label}</dt>
                    <dd className="text-sm font-bold text-text">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
