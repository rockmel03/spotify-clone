import { useEffect } from "react";
import useApiPrivate from "../hooks/useApiPrivate";
import { SideNav } from "./SideNav";
import { Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Login } from "../features/auth/Login";
import { getAccessTokenFromUrl } from "../api/spotify";
import { MusicPlayerBar } from "../features/Player/MusicPlayerBar";

export const Layout = () => {
  const api = useApiPrivate();
  const [auth, dispatch] = useAuth();

  useEffect(() => {
    const _token = getAccessTokenFromUrl();
    if (_token) dispatch({ type: "SET_TOKEN", token: _token });
  }, [dispatch]);

  useEffect(() => {
    if (auth?.token) {
      api
        .get("/me")
        .then((res) => dispatch({ type: "SET_USER", user: res.data }))
        .catch((err) => console.log(err));
    }
  }, [auth?.token, api, dispatch]);

  return !auth?.token ? (
    <Login />
  ) : (
    <main className="w-full h-screen grid grid-cols-[320px_1fr] grid-rows-8 gap-2 p-2 bg-zinc-950 text-zinc-100">
      <section className="sidenav row-[1/8]  overflow-y-auto">
        <SideNav />
      </section>
      <section className="main row-[1/8] overflow-y-auto">
        <Outlet />
      </section>
      <section className="playerbar col-span-2 row-[8/9]">
        <MusicPlayerBar />
      </section>
    </main>
  );
};
