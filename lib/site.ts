/** All website content in one place. Edit here to update the site. */

export const GAME = {
  name: 'Fighter Aura',
  tagline: 'Unleash your aura.',
  description:
    'A fast 2.5D fighting game for Android. Five fighters, fourteen moves, combos, supers and a smart AI — free, offline and ad-free.',
  version: '1.0.0',
  apkUrl: '/downloads/FighterAura-v1.0.apk',
  apkSize: '61 MB',
  minAndroid: 'Android 7.0+',
  lastUpdated: '29 October 2026',
};

export const DEVELOPER = {
  name: 'Siddharth Jain',
  initials: 'SJ',
  role: 'Software Engineer · Full-stack & Mobile',
  location: 'Hapur, Delhi NCR, India',
  experience: '5+ years',
  bio: 'I build scalable web and mobile apps with React, React Native, Next.js and Node.js. Fighter Aura is my take on a fast, fun fighting game that runs smoothly on any Android phone.',
  skills: ['React Native', 'React', 'Next.js', 'TypeScript', 'Node.js', 'MongoDB', 'Redux', 'Tailwind CSS'],
};

export const CONTACT_EMAIL = 'infosiddjain@gmail.com';

export type SocialId = 'github' | 'linkedin' | 'x' | 'instagram' | 'facebook';

export const SOCIALS: { id: SocialId; label: string; url: string }[] = [
  { id: 'github', label: 'GitHub', url: 'https://github.com/infosiddjain' },
  { id: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/in/infosiddjain/' },
  { id: 'x', label: 'X', url: 'https://x.com/infosiddjain' },
  { id: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/infosiddjain/' },
  { id: 'facebook', label: 'Facebook', url: 'https://www.facebook.com/infosiddjain' },
];

export const STATS = [
  { value: '5', label: 'Fighters' },
  { value: '14', label: 'Moves' },
  { value: '5', label: 'Arenas' },
  { value: '60', label: 'FPS' },
];

export const FEATURES = [
  {
    icon: '⚡',
    title: 'Real combos',
    text: 'Chain Jab → Cross → Power Straight, launch with an uppercut and juggle in the air.',
  },
  {
    icon: '🛡️',
    title: 'Mind games',
    text: 'High, mid, low and overhead attacks. Block standing or crouching — guess right to survive.',
  },
  {
    icon: '🔥',
    title: 'Aura supers',
    text: 'Land hits to charge your aura. Throw an Aura Blast or unleash the cinematic 5-hit AURA RUSH.',
  },
  {
    icon: '🤖',
    title: 'Smart AI',
    text: 'Easy, Medium or Hard. The computer blocks, punishes misses, anti-airs and mixes you up.',
  },
  {
    icon: '🏆',
    title: 'Arcade ladder',
    text: 'Beat every fighter across five arenas — the tougher the stage, the sharper the rival.',
  },
  {
    icon: '📱',
    title: 'Made for phones',
    text: '8-way joystick, big thumb buttons, haptics, and layouts that fit every screen.',
  },
];

export type Look = 'headband' | 'mohawk' | 'mask' | 'ponytail' | 'beard';

export interface FighterInfo {
  name: string;
  title: string;
  power: number; // 0..100
  speed: number;
  health: number;
  scale: number;
  look: Look;
  colors: { skin: string; skinDark: string; primary: string; secondary: string; secondaryDark: string; accent: string; aura: string };
}

/** Same fighters and colors as the game. */
export const FIGHTERS: FighterInfo[] = [
  {
    name: 'BLAZE', title: 'Fast striker', power: 64, speed: 92, health: 71, scale: 1, look: 'headband',
    colors: { skin: '#e0a67a', skinDark: '#b07a55', primary: '#e8492f', secondary: '#2b2d42', secondaryDark: '#1b1c2b', accent: '#ffcf3f', aura: '#ff6a2b' },
  },
  {
    name: 'TITAN', title: 'Heavy brawler', power: 86, speed: 57, health: 86, scale: 1.12, look: 'mohawk',
    colors: { skin: '#8d5a3b', skinDark: '#6a412a', primary: '#2f8fe8', secondary: '#3a3f2b', secondaryDark: '#25281b', accent: '#5cf2d6', aura: '#2bd4ff' },
  },
  {
    name: 'VIPER', title: 'Long-range kicker', power: 68, speed: 80, health: 68, scale: 1, look: 'mask',
    colors: { skin: '#f1c9a5', skinDark: '#c79e7c', primary: '#2f9e55', secondary: '#1f3b2a', secondaryDark: '#13261b', accent: '#c6ff4a', aura: '#7dff5a' },
  },
  {
    name: 'NOVA', title: 'Balanced all-rounder', power: 71, speed: 79, health: 75, scale: 0.98, look: 'ponytail',
    colors: { skin: '#c98f6b', skinDark: '#a06e50', primary: '#9b4dff', secondary: '#2a1f3b', secondaryDark: '#1a1326', accent: '#ff7ae0', aura: '#c77dff' },
  },
  {
    name: 'GOLEM', title: 'Unstoppable tank', power: 96, speed: 40, health: 100, scale: 1.22, look: 'beard',
    colors: { skin: '#9c8f80', skinDark: '#766b5f', primary: '#7a5c3a', secondary: '#3b3127', secondaryDark: '#261f18', accent: '#ffb000', aura: '#ffb000' },
  },
];

export type Level = 'HIGH' | 'MID' | 'LOW' | 'OVERHEAD' | 'SPECIAL';

export const MOVES: { input: string; name: string; level: Level; note?: string }[] = [
  { input: 'P', name: 'Jab', level: 'HIGH' },
  { input: 'P → P', name: 'Cross', level: 'HIGH' },
  { input: 'P → P → P', name: 'Power Straight', level: 'MID', note: 'Pushes far back' },
  { input: 'P → K', name: 'Spin Kick', level: 'HIGH', note: 'Knocks down' },
  { input: 'K', name: 'Roundhouse', level: 'MID' },
  { input: 'K → K', name: 'Axe Kick', level: 'OVERHEAD', note: 'Beats crouch block' },
  { input: '▶ + P', name: 'Rising Uppercut', level: 'MID', note: 'Launches, beats jumps' },
  { input: '▶ + K', name: 'Front Kick', level: 'MID', note: 'Long range push' },
  { input: '▼ + P', name: 'Low Jab', level: 'LOW' },
  { input: '▼ + K', name: 'Leg Sweep', level: 'LOW', note: 'Knocks down' },
  { input: 'Jump + P', name: 'Diving Punch', level: 'OVERHEAD' },
  { input: 'Jump + K', name: 'Flying Kick', level: 'OVERHEAD' },
  { input: 'S · ½ aura', name: 'Aura Blast', level: 'SPECIAL', note: 'Energy ball' },
  { input: 'S · full aura', name: 'AURA RUSH', level: 'SPECIAL', note: '5-hit super' },
];

export const LEVEL_COLORS: Record<Level, string> = {
  HIGH: '#ffd23f',
  MID: '#5cc8ff',
  LOW: '#7dff5a',
  OVERHEAD: '#ff7ae0',
  SPECIAL: '#d58bff',
};

export const MODES = [
  {
    title: 'Arcade',
    text: 'Pick a fighter and climb the ladder against all four rivals. The final boss waits at the top.',
    image: '/screens/arcade.jpg',
  },
  {
    title: 'Quick Fight',
    text: 'Choose your fighter and your opponent for a single match on a random arena.',
    image: '/screens/select.jpg',
  },
];

export const SCREENSHOTS = [
  { src: '/screens/super.jpg', alt: 'Viper charges an AURA RUSH super move' },
  { src: '/screens/combo.jpg', alt: 'A 5-hit combo knocks Blaze down' },
  { src: '/screens/hit.jpg', alt: 'Impact flash on a heavy hit' },
  { src: '/screens/fight.jpg', alt: 'Close-range exchange at sunset' },
  { src: '/screens/select.jpg', alt: 'Character select with difficulty' },
  { src: '/screens/arcade.jpg', alt: 'Arcade ladder: Blaze vs Viper' },
  { src: '/screens/moves.jpg', alt: 'In-game move list' },
  { src: '/screens/result.jpg', alt: 'Match result screen' },
  { src: '/screens/menu.jpg', alt: 'Main menu' },
];

export const PLATFORM_FACTS = [
  { label: 'Platform', value: 'Android 7.0 and newer' },
  { label: 'Price', value: 'Free, no ads' },
  { label: 'Internet', value: 'Not needed — plays offline' },
  { label: 'Built with', value: 'React Native, Skia, Reanimated' },
  { label: 'Engine', value: 'Custom 60 FPS fighting engine' },
];

export const NAV_LINKS = [
  { href: '/#features', label: 'Features' },
  { href: '/#fighters', label: 'Fighters' },
  { href: '/#moves', label: 'Moves' },
  { href: '/#gallery', label: 'Gallery' },
  { href: '/#developer', label: 'Developer' },
  { href: '/contact', label: 'Contact' },
];
