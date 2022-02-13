import { createContext, useReducer } from 'react';

export const StoreContext = createContext();

export const ACTION_TYPES = {
  SET_LATLONG: 'SET_LATLONG',
  SET_COFFEE_STORES: 'SET_COFFEE_STORES',
};

const storeReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_LATLONG: {
      return { ...state, latlong: action.payload.latlong };
    }
    case ACTION_TYPES.SET_COFFEE_STORES: {
      return {
        ...state,
        coffeeStoresNearme: action.payload.coffeeStoresNearme,
      };
    }
    default:
      throw new Error(`Unhandled action type ${action.type}`);
  }
};

const StoreProvider = ({ children }) => {
  const initialState = {
    latlong: '',
    coffeeStoresNearme: [],
  };
  const [state, dispatch] = useReducer(storeReducer, initialState);
  return (
    /*eslint-disable*/
    <StoreContext.Provider value={{ state,dispatch }}>
      {children}
    </StoreContext.Provider>
      /* eslint-enable */
  );
};

export default StoreProvider;
