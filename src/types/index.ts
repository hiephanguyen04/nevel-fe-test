export * from "./promo";
export * from "./promo-slider";

export interface Game {
  id: number | string;
  title: string;
  provider?: string;
  image?: string;
  isHot?: boolean;
  isNew?: boolean;
  category?: string;
  rating?: number;
  releaseDate?: string;
  description?: string;
  features?: string[];
}

export interface Provider {
  id: number | string;
  name: string;
  logo?: string;
  gamesCount?: number;
  description?: string;
  website?: string;
  established?: string;
  headquarters?: string;
  licenseInfo?: string;
}

export interface PromoSlide {
  id: number | string;
  title: string;
  subtitle?: string;
  buttonText: string;
  buttonLink?: string;
  label?: string;
  image: string;
  bgColor?: string;
  description?: string;
  expiryDate?: string;
  termsLink?: string;
}

/**
 * Category filter item data structure
 */
export interface CategoryItem {
  id: string;
  name: string;
  icon?: React.ReactNode;
  count?: number;
  slug?: string;
}

/**
 * API response structure
 */
export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
  pagination?: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
}

export interface User {
  id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  role: "user" | "vip" | "admin";
  createdAt: string;
  lastLogin?: string;
  preferences?: {
    theme?: "light" | "dark" | "system";
    language?: string;
    notifications?: boolean;
  };
}

export interface RouteConfig {
  path: string;
  label: string;
  icon?: React.ReactNode;
  children?: RouteConfig[];
  isExternal?: boolean;
}

export interface ThemeConfig {
  colors: {
    [key: string]: string;
  };
  breakpoints: {
    [key: string]: string;
  };
  fonts: {
    [key: string]: string;
  };
}

export interface GridConfig {
  columns?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: string | number;
  maxItems?: number;
}

export interface ErrorState {
  message: string;
  code?: string;
  stack?: string;
}
