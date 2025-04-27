import { useEffect, useMemo, useState } from 'react';

const MOBILE_BREAKPOINT = 768; // Adjust this breakpoint as needed

/**
 * Custom hook to check if the current viewport matches a mobile media query.
 * @returns {boolean} True if the viewport width is less than or equal to the mobile breakpoint, false otherwise.
 */
export const useIsMobile = (): boolean => {
  const mediaQueryString = useMemo(
    () => `(max-width: ${MOBILE_BREAKPOINT}px)`,
    []
  );
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    // Initial state based on current window size (if window is available)
    if (typeof window !== 'undefined') {
      return window.matchMedia(mediaQueryString).matches;
    }
    return false; // Default to false during SSR or if window is unavailable
  });

  useEffect(() => {
    // Ensure window object is available (runs only on client-side)
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQueryList = window.matchMedia(mediaQueryString);

    // Handler to update state when media query match status changes
    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    // Set initial state accurately after mount (in case it changed between SSR and hydration)
    setIsMobile(mediaQueryList.matches);

    // Add listener for changes
    try {
      // Newer browsers support addEventListener
      mediaQueryList.addEventListener('change', handleMediaQueryChange);
    } catch (e) {
      // Fallback for older browsers
      mediaQueryList.addListener(handleMediaQueryChange);
    }

    // Cleanup function to remove the listener on unmount
    return () => {
      try {
        // Newer browsers support removeEventListener
        mediaQueryList.removeEventListener('change', handleMediaQueryChange);
      } catch (e) {
        // Fallback for older browsers
        mediaQueryList.removeListener(handleMediaQueryChange);
      }
    };
  }, [mediaQueryString]); // Re-run effect only if mediaQueryString changes (it won't in this case)

  return isMobile;
};
