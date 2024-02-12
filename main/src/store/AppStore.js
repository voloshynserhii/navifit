'use client';
import { createContext, useReducer, useContext } from 'react';
// import useMediaQuery from '@mui/material/useMediaQuery';
import AppReducer from './AppReducer';
import { localStorageGet } from '../utils/localStorage';
import { IS_SERVER } from '../utils/environment';

const INITIAL_APP_STATE = {
  darkMode: false, // Overridden by useMediaQuery('(prefers-color-scheme: dark)') in AppStore
  isAuthenticated: false, // Overridden in AppStore by checking auth token
};

/**
 * Instance of React Context for global AppStore
 */

const AppContext = createContext([INITIAL_APP_STATE, () => null]);

/**
 * Main global Store as HOC with React Context API
 * @component AppStoreProvider
 * import {AppStoreProvider} from './store'
 * ...
 * <AppStoreProvider>
 *  <App/>
 * </AppStoreProvider>
 */
const AppStoreProvider = ({ children }) => {
  // const prefersDarkMode = IS_SERVER ? false : useMediaQuery('(prefers-color-scheme: dark)'); // Note: Conditional hook is bad idea :(
  const prefersDarkMode = IS_SERVER ? false : window.matchMedia('(prefers-color-scheme: dark)').matches;
  const previousDarkMode = IS_SERVER ? false : Boolean(localStorageGet('darkMode', false));
  // const tokenExists = Boolean(loadToken());

  const initialState = {
    ...INITIAL_APP_STATE,
    darkMode: previousDarkMode || prefersDarkMode,
    // isAuthenticated: tokenExists,
  };
  const value = useReducer(AppReducer, initialState);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

/**
 * Hook to use the AppStore in functional components
 * @hook useAppStore
 * import {useAppStore} from './store'
 * ...
 * const [state, dispatch] = useAppStore();
 *   OR
 * const [state] = useAppStore();
 */
const useAppStore = () => useContext(AppContext);

/**
 * HOC to inject the ApStore to class component, also works for functional components
 * @hok withAppStore
 * import {withAppStore} from './store'
 * ...
 * class MyComponent
 *
 * render () {
 *   const [state, dispatch] = this.props.appStore;
 *   ...
 * }
 * ...
 * export default withAppStore(MyComponent)
 */

const withAppStore = (Component) =>
  function ComponentWithAppStore(props) {
    return <Component {...props} appStore={useAppStore()} />;
  };

export { 
  AppStoreProvider, 
  useAppStore, 
  withAppStore };
