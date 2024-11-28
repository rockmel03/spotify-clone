import { useEffect } from "react";
import api from "../api/axios";
import useAuth from "./useAuth";
import { refreshAccessToken } from "../features/auth/auth";

const useApiPrivate = () => {
  const [auth, dispatch] = useAuth();

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
        console.log(error);
        const prevRequest = error?.config;

        if (error?.response?.status === 401 && !prevRequest.sent) {
          prevRequest.sent = true;
          const response = await refreshAccessToken();

          if (response?.refresh_token) {
            localStorage.setItem("refresh_token", response.refresh_token);
          }

          if (response?.access_token) {
            dispatch({
              type: "SET_TOKEN",
              token: response.access_token,
            });

            prevRequest.headers[
              "Authorization"
            ] = `Bearer ${response.access_token}`;

            return prevRequest;
          }

          return Promise.reject(error);
        }
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
