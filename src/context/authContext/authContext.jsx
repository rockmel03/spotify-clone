import { createContext, useEffect, useReducer } from "react";
import reducer, { initialState } from "./authReducer";

const authContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const token = localStorage.getItem("access_token") || null;
    if (token) dispatch({ type: "SET_TOKEN", token });
  }, []);

  return (
    <authContext.Provider value={[state, dispatch]}>
      {children}
    </authContext.Provider>
  );
};

export default authContext;
