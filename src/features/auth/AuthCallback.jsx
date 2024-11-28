import { useEffect, useState } from "react";
import { getUrlParams, requestAccessToken } from "./auth";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const AuthCallback = () => {
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [auth, dispatch] = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    const urlParams = getUrlParams();
    const code = urlParams?.code;
    if (!code) {
      setErrMsg("");
      setIsLoading(false);
      return;
    }
    requestAccessToken(code)
      .then((res) => {
        if (!res?.access_token)
          throw new Error(
            "Failed to get access token: \n" + JSON.stringify(res)
          );

        dispatch({ type: "SET_TOKEN", token: res.access_token });
      })
      .catch((err) => {
        setErrMsg(err.message);
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
        navigate("/");
      });
  }, []);

  return (
    <section>
      {errMsg ? (
        <p className="text-rose-500">{errMsg}</p>
      ) : isLoading ? (
        <p>Loading...</p>
      ) : (
        <h1>redirecting...</h1>
      )}
    </section>
  );
};

export default AuthCallback;
