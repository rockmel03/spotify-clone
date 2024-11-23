import { useEffect } from "react";
import useAuth from "./hooks/useAuth";
import { Login } from "./features/auth/Login";
import { getAccessTokenFromUrl } from "./features/auth/spotify";
import { Home } from "./components/Home";

function App() {
  const [auth, dispatch] = useAuth();

  useEffect(() => {
    const _token = getAccessTokenFromUrl();
    if (_token) {
      dispatch({ type: "SET_TOKEN", token: _token });
    }
  }, [dispatch]);

  return <>{!auth.token ? <Login /> : <Home />}</>;
}

export default App;
