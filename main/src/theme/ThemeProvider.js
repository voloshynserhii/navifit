'use client';
import { useEffect, useMemo, useState } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import EmotionCacheProvider from './EmotionCacheProvider';
import { useAppStore } from '../store';
import DARK_THEME from './dark';
import LIGHT_THEME from './light';

function getThemeByDarkMode(darkMode) {
  return darkMode ? createTheme(DARK_THEME) : createTheme(LIGHT_THEME);
}

/**
 * Renders composition of Emotion's CacheProvider + MUI's ThemeProvider to wrap content of entire App
 * The Light or Dark themes applied depending on global .darkMode state
 * @component ThemeProvider
 */
const ThemeProvider = ({ children }) => {
  const [state] = useAppStore();
  const [loading, setLoading] = useState(true);

  const currentTheme = useMemo(
    () => getThemeByDarkMode(state.darkMode),
    [state.darkMode] // Observe AppStore and re-create the theme when .darkMode changes
  );

  useEffect(() => setLoading(false), []); // Set .loading to false when the component is mounted

  if (loading) return null; // Don't render anything until the component is mounted

  return (
    <EmotionCacheProvider options={{ key: 'mui' }}>
      <MuiThemeProvider theme={createTheme(LIGHT_THEME)}>
        <CssBaseline /* MUI Styles */ />
        {children}
      </MuiThemeProvider>
    </EmotionCacheProvider>
  );
};

export default ThemeProvider;
