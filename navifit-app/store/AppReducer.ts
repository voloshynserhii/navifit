/**
 * Reducer for global AppStore using "Redux styled" actions
 * @function AppReducer
 * @param {object} state - current/default state
 * @param {string} action.type - unique name of the action
 * @param {string} action.action - alternate to action.type property, unique name of the action
 * @param {*} [action.payload] - optional data object or the function to get data object
 */
const AppReducer = (state: any, action: any) => {
  // console.log('AppReducer() - action:', action.type, action?.payload);
  switch (action.type || action.action) {
    case 'CURRENT_USER':
      return {
        ...state,
        currentUser: action?.payload,
        isAuthenticated: !!action?.payload,
      };
    case 'USER_DATA':
      return {
        ...state,
        userData: action?.userData || action?.payload,
      };
    // case 'SIGN_UP':
    case 'LOG_IN':
      return {
        ...state,
        isAuthenticated: true,
      };
    case 'LOG_OUT': {
      return {
        ...state,
        isAuthenticated: false,
        currentUser: undefined, // Also reset previous user data
      };
    }
    case 'DARK_MODE': {
      const darkMode = action?.darkMode ?? action?.payload;
      return {
        ...state,
        darkMode,
      };
    }
    case 'ADMIN_MODE_ON':
      return {
        ...state,
        isAdmin: true,
      };
    case 'ADMIN_MODE_OFF':
      return {
        ...state,
        isAdmin: false,
      };
    default:
      return state;
  }
};

export default AppReducer;