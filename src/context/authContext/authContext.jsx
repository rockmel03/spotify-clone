import { createContext, useReducer } from "react";
import reducer, { initialState } from "./authReducer";

const authContext = createContext();

export const AuthContextProvider = ({ children }) => {
  return (
    <authContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </authContext.Provider>
  );
};

export default authContext;
