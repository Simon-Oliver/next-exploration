import React, { createContext, useContext, useReducer } from "react";
import moment from "moment";

const StoreContext = createContext();
const initialState = {
  chartDateTime: {
    startDate: moment(),
    endDate: moment().subtract(24, "hours"),
    startTime: "00:00",
    endTime: "24:00",
  },
  tempProbeData: [{ name: "", hum: "", temp: "", max: "", min: "" }],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "startDate":
      return {
        chartDateTime: { ...state.chartDateTime, startDate: action.data },
      };
    case "endDate":
      return {
        chartDateTime: { ...state.chartDateTime, endDate: action.data },
      };
    case "startTime":
      return {
        chartDateTime: { ...state.chartDateTime, startTime: action.data },
      };
    case "endTime":
      return {
        chartDateTime: { ...state.chartDateTime, endTime: action.data },
      };
    case "SetTempProbeData":
      return {
        ...state,
        tempProbeData: [...state.tempProbeData, action.data],
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
