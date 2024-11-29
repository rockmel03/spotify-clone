import { refreshAccessToken } from "../features/auth/auth";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const [auth, dispatch] = useAuth();

  const refresh = async () => {
    try {
      const data = await refreshAccessToken();
      dispatch({
        type: "SET_TOKEN",
        token: data.access_token,
      });
      return data?.access_token;
    } catch (error) {
      console.error("Error: failed to refresh token", error);
    }
  };

  return refresh;
};

export default useRefreshToken;
