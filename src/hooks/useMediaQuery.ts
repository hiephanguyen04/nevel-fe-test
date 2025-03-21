/**
 * useMediaQuery Hook
 * 
 * A custom React hook that detects if a media query matches the current viewport.
 * 
 * @param {string} query - CSS media query string
 * @returns {boolean} - Whether the media query matches
 * 
 * @example
 * ```tsx
 * const isMobile = useMediaQuery('(max-width: 640px)');
 * const isTablet = useMediaQuery('(min-width: 641px) and (max-width: 1024px)');
 * const isDesktop = useMediaQuery('(min-width: 1025px)');
 * ```
 */

'use client';

import { useState, useEffect } from 'react';

/**
 * Custom hook that returns whether a media query matches
 * 
 * @param query - CSS media query string
 * @returns Whether the media query matches
 */
const useMediaQuery = (query: string): boolean => {
  // Initialize with a value for SSR (default to false)
  const [matches, setMatches] = useState<boolean>(false);
  
  useEffect(() => {
    // Check if window is available (client-side)
    if (typeof window === 'undefined') return;
    
    // Create a media query list
    const mediaQuery = window.matchMedia(query);
    
    // Set initial value
    setMatches(mediaQuery.matches);
    
    // Create event listener function
    const handleChange = (event: MediaQueryListEvent): void => {
      setMatches(event.matches);
    };
    
    // Add event listener
    mediaQuery.addEventListener('change', handleChange);
    
    // Clean up
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [query]);
  
  return matches;
};

export default useMediaQuery;