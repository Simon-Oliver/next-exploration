import React, { createContext, useContext, useReducer } from 'react';

const StoreContext = createContext();
const initialState = {
  chartDateTime: { startDate: '', endDate: '', startTime: '00:00', endTime: '24:00' },
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'startDate':
      return {
        chartDateTime: { ...state.chartDateTime, startDate: action.data },
      };
    case 'endDate':
      return {
        chartDateTime: { ...state.chartDateTime, endDate: action.data },
      };
    case 'startTime':
      return {
        chartDateTime: { ...state.chartDateTime, startTime: action.data },
      };
    case 'endTime':
      return {
        chartDateTime: { ...state.chartDateTime, endTime: action.data },
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>;
};

export const useStore = () => useContext(StoreContext);
