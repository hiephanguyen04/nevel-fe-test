/**
 * Application Constants
 *
 * Centralized constants for the entire application.
 * Use these constants instead of hardcoding values throughout the app.
 */

import { ThemeConfig, CategoryItem } from "@/types";

/**
 * Site configuration
 */
export const SITE_CONFIG = {
  name: "Bluechip Gaming",
  domain: "bluechip.com",
  description: "Play exclusive casino games and win big prizes",
  supportEmail: "support@bluechip.com",
} as const;

/**
 * Navigation routes
 */
export const ROUTES = {
  HOME: "/",
  GAMES: "/games",
  GAME_DETAILS: (id: string | number) => `/games/${id}`,
  PROVIDERS: "/providers",
  PROVIDER_DETAILS: (id: string | number) => `/providers/${id}`,
  PROMOTIONS: "/promotions",
  INFO: "/info",
  NEWS: "/news",
  VIP: "/vip",
  HELP: "/help",
  TERMS: "/legal/terms",
  PRIVACY: "/legal/privacy",
  RESPONSIBLE_GAMING: "/legal/responsible-gaming",
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
} as const;

/**
 * API endpoints
 */
export const API = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || "/api",
  GAMES: "/games",
  PROVIDERS: "/providers",
  PROMOTIONS: "/promotions",
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
  },
} as const;

/**
 * Theme configuration
 */
export const THEME: ThemeConfig = {
  colors: {
    primary: "#0A1428",
    secondary: "#0E1A32",
    accent: "#FF2E8E",
    highlight: "#10B981",
    darkBlue: "#081020",
  },
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },
  fonts: {
    base: "var(--font-inter)",
    heading: "var(--font-inter)",
    mono: "monospace",
  },
};

/**
 * Social media links
 */
export const SOCIAL_LINKS = {
  TELEGRAM: "https://t.me/bluechip",
  FACEBOOK: "https://facebook.com/bluechip",
  INSTAGRAM: "https://instagram.com/bluechip",
  TWITTER: "https://twitter.com/bluechip",
} as const;

/**
 * Game categories
 */
export const GAME_CATEGORIES: CategoryItem[] = [
  { id: "all", name: "All Games" },
  { id: "slots", name: "Slots" },
  { id: "live", name: "Live Casino" },
  { id: "table", name: "Table Games" },
  { id: "crash", name: "Crash Games" },
  { id: "jackpot", name: "Jackpots" },
  { id: "hot", name: "Hot Games" },
  { id: "new", name: "New Games" },
];

/**
 * App settings
 */
export const APP_SETTINGS = {
  pageSize: 20,
  maxRecentGames: 5,
  cacheTimeout: 5 * 60 * 1000, // 5 minutes in ms
  defaultLanguage: "en",
  supportedLanguages: ["en", "es", "fr", "de", "it"],
} as const;
