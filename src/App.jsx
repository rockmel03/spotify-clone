import { useEffect } from "react";
import useAuth from "./hooks/useAuth";
import { Login } from "./features/auth/Login";
import { Layout } from "./components/Layout";
import { getAccessTokenFromUrl } from "./api/spotify";

function App() {
  const [auth, dispatch] = useAuth();

  useEffect(() => {
    const _token = getAccessTokenFromUrl();
    if (_token) {
      dispatch({ type: "SET_TOKEN", token: _token });
    }
  }, [dispatch]);

  return <>{!auth.token ? <Login /> : <Layout />}</>;
}

export default App;
