import type { Metadata, Viewport } from 'next';
import { Geist, Russo_One } from 'next/font/google';
import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import { DEVELOPER, GAME } from '@/lib/site';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const russo = Russo_One({
  variable: '--font-russo',
  weight: '400',
  subsets: ['latin'],
});

// Absolute URL for social preview images (Vercel sets this automatically)
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000');

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${GAME.name} — 2.5D fighting game for Android`,
    template: `%s · ${GAME.name}`,
  },
  description: GAME.description,
  authors: [{ name: DEVELOPER.name }],
  keywords: ['fighting game', 'android game', 'free game', 'offline game', 'Fighter Aura'],
  openGraph: {
    title: GAME.name,
    description: GAME.description,
    type: 'website',
    images: [{ url: '/screens/super.jpg', width: 1400, height: 630, alt: `${GAME.name} gameplay` }],
  },
  twitter: { card: 'summary_large_image', title: GAME.name, description: GAME.description },
};

export const viewport: Viewport = {
  themeColor: '#0d0616',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${russo.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
