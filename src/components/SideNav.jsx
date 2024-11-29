import { HeartBoxIcon, HomeIcon, LiabraryIcon } from "../assets/icons/Icons";
import { NavLink } from "react-router-dom";

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
  return (
    <nav className="flex flex-col w-full h-full p-8 bg-zinc-900 rounded">
      <ul className="flex flex-col gap-2">
        {navLinks.map((item) => (
          <li key={item.link} className="">
            <NavLink
              to={item.link}
              className={(state) =>
                `w-full h-full text-xl flex gap-2 items-center ${
                  state.isActive ? "opacity-100" : "opacity-70"
                } hover:opacity-100 duration-200 ease-out`
              }
            >
              <i className="text-[2.4em]">{item.icon}</i>
              <span className="capitalize font-medium">{item.title}</span>
            </NavLink>
          </li>
        ))}
      </ul>
      <hr className="my-5 border-zinc-500" />
      <ul className="flex flex-col overflow-auto">
        {[{}, {}, {}, {}, {}, {}, {}, {}].map((playlist, index) => (
          <li key={index}>
            <NavLink
              to={`playlist/${index}`}
              className={(state) =>
                `flex gap-2 items-center p-2 rounded hover:bg-zinc-800 ${
                  state.isActive ? "bg-zinc-800" : "bg-transparent"
                }`
              }
            >
              <div className="w-[20%] aspect-square bg-zinc-500 rounded overflow-hidden"></div>
              <div>
                <h3>playlist {index + 1}</h3>
                <p className="text-[0.9em] opacity-80">ROCK MEL</p>
              </div>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
