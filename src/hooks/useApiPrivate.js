import { useEffect } from "react";
import api from "../api/axios";
import useAuth from "./useAuth";

const useApiPrivate = () => {
  const [auth] = useAuth();

  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use((req) => {
      if (req && !req?.headers?.Authorization && auth?.token) {
        // req.headers["Authorization"] = `Bearer ${auth.token}`;
        req.headers.set("Authorization", `Bearer ${auth.token}`);
      }
      return req;
    });

    return () => {
      api.interceptors.request.eject(requestInterceptor);
    };
  }, [auth.token]);

  return api;
};

export default useApiPrivate;
