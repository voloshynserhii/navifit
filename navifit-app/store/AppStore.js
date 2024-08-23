import { createContext, useReducer, useContext } from 'react';
import AppReducer from './AppReducer';

const INITIAL_APP_STATE = {
  isAdmin: false,
  darkMode: false, // Overridden by useMediaQuery('(prefers-color-scheme: dark)') in AppStore
  isAuthenticated: false, // Overridden in AppStore by checking auth token
  userData: {},
  currentUser: undefined
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

  const initialState = {
    ...INITIAL_APP_STATE,
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

const withAppStore = (Component) =>
  function ComponentWithAppStore(props) {
    return <Component {...props} appStore={useAppStore()} />;
  };

export { 
  AppStoreProvider, 
  useAppStore, 
  withAppStore };
