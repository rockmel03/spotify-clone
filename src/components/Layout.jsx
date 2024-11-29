import { SideNav } from "./SideNav";
import { Outlet } from "react-router-dom";
import { MusicPlayerBar } from "../features/Player/MusicPlayerBar";

export const Layout = () => {
  return (
    <main className="relative w-full h-screen grid grid-cols-[1fr] lg:grid-cols-[320px_1fr] grid-rows-8 lg:gap-x-2 gap-y-2 p-2 bg-zinc-950 text-zinc-100">
      <section className="sidenav row-[1/8]  overflow-y-auto w-[300px] fixed -left-full top-1/2 -translate-y-1/2 z-50 lg:relative lg:left-auto lg:w-auto">
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
