import { useContext } from "react";
import authContext from "../context/authContext/authContext";

const useAuth = () => {
  return useContext(authContext);
};

export default useAuth;
