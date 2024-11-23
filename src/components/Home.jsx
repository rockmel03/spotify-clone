import { useEffect } from "react";
import useApiPrivate from "../hooks/useApiPrivate";
import useAuth from "../hooks/useAuth";

export const Home = () => {
  const api = useApiPrivate();
  const [auth, dispatch] = useAuth();

  useEffect(() => {
    let isMounted = true;
    const getUserData = async () => {
      try {
        const response = await api.get("/me");
        if (response.status === 200) {
          isMounted && dispatch({ type: "SET_USER", user: response.data });
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();

    return () => {
      isMounted = false;
    };
  }, [api, dispatch]);

  return (
    <section>
      <h1>{auth?.user ? `Welcome ${auth.user.display_name}` : "Welcome"}</h1>
    </section>
  );
};
