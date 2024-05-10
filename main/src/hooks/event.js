import { useCallback, useEffect } from 'react';
import { useAppStore } from '../store';

/**
 * Returns event handler to toggle Dark/Light modes
 * @returns {function} calling this event toggles dark/light mode
 */
export function useEventSwitchDarkMode() {

  const [state, dispatch] = useAppStore();

  return useCallback(() => {
    dispatch({
      type: 'DARK_MODE',
      payload: !state.darkMode,
    });
  }, [state, dispatch]);
}

export function useBackground() {
  useEffect(() => {
    const body = document.querySelector('body')
    
    if (body) {
      body.classList.add('bg')
    }
    
    return () => {
      if (body) {
        body.classList.remove('bg')
      }
    }
  }, [])
}