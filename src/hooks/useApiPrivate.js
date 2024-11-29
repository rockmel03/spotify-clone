import { useEffect } from "react";
import api from "../api/axios";
import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken";

const useApiPrivate = () => {
  const [auth] = useAuth();
  const refresh = useRefreshToken();

  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use((req) => {
      if (req && !req?.headers?.Authorization && auth?.token) {
        // req.headers["Authorization"] = `Bearer ${auth.token}`;
        req.headers.set("Authorization", `Bearer ${auth.token}`);
      }
      return req;
    });

    const responseInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;

        if (error?.response?.status === 401 && !prevRequest.sent) {
          prevRequest.sent = true;
          console.log("refresh access token...");
          const access_token = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${access_token}`;

          return prevRequest;
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [auth.token]);

  return api;
};

export default useApiPrivate;
