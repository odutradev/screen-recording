import { useEffect } from 'react'

import useSystemStore from '@stores/system'

import type { ThemeMode } from './types'

const useSystemTheme = (): ThemeMode => {
  const { system: { theme, checkUserTheme }, updateSystem } = useSystemStore()

  useEffect(() => {
    if (!checkUserTheme) {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      updateSystem({ theme: isDark ? 'dark' : 'light', checkUserTheme: true });
    };
  }, []);

  useEffect(() => {
    const matchMedia = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (e: MediaQueryListEvent) => updateSystem({ theme: e.matches ? 'dark' : 'light' });

    if (matchMedia.addEventListener) matchMedia.addEventListener('change', handler)
    else matchMedia.addListener(handler)

    return () => {
      if (matchMedia.removeEventListener) matchMedia.removeEventListener('change', handler)
      else matchMedia.removeListener(handler)
    }
  }, [updateSystem]);

  return theme;
}

export default useSystemTheme;