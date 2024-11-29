import { SideNav } from "./SideNav";
import { Outlet } from "react-router-dom";
import { MusicPlayerBar } from "../features/Player/MusicPlayerBar";

export const Layout = () => {
  return (
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
