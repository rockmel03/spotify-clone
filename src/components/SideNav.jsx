import { useEffect } from "react";
import { HeartBoxIcon, HomeIcon, LiabraryIcon } from "../assets/icons/Icons";
import useApiPrivate from "../hooks/useApiPrivate";
import { Link } from "react-router-dom";

const navLinks = [
  {
    link: "/home",
    title: "home",
    icon: <HomeIcon />,
  },
  {
    link: "/liked",
    title: "liked",
    icon: <HeartBoxIcon />,
  },
  {
    link: "/liabrary",
    title: "liabrary",
    icon: <LiabraryIcon />,
  },
];

export const SideNav = () => {
  const api = useApiPrivate();

  useEffect(() => {
    api
      .get("/me/albums")
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    api
      .get("/me/tracks")
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <nav className="flex flex-col w-full h-full p-8 bg-zinc-900 rounded">
      <ul className="flex flex-col gap-2">
        {navLinks.map((item) => (
          <li
            key={item.link}
            className="opacity-70 hover:opacity-100 duration-200 ease-out"
          >
            <Link
              to={item.link}
              className="w-full h-full text-xl flex gap-2 items-center"
            >
              <i className="text-[2.4em]">{item.icon}</i>
              <span className="capitalize font-medium">{item.title}</span>
            </Link>
          </li>
        ))}
      </ul>
      <hr className="my-5 border-zinc-500" />
      <ul className="flex flex-col overflow-auto">
        {[{}, {}, {}, {}, {}, {}, {}, {}].map((playlist, index) => (
          <li key={index}>
            <a
              href="#"
              className="flex gap-2 items-center p-2 rounded hover:bg-zinc-800"
            >
              <div className="w-[20%]  aspect-square bg-zinc-500 rounded overflow-hidden"></div>
              <div>
                <h3>playlist {(Math.random() * 10).toFixed(0)}</h3>
                <p className="text-[0.9em] opacity-80">ROCK MEL</p>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
