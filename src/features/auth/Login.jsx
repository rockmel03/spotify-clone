import { redirectAuthUrl } from "../../api/spotify";
import logo from "../../assets/images/Spotify_logo.png";

export const Login = () => {
  return (
    <section className="w-full h-screen p-[10vw] flex flex-col items-center justify-center gap-20 bg-zinc-900 text-white">
      <img
        src={logo}
        alt="spotify logo"
        className="max-w-[300px] lg:max-w-[600px]"
      />
      <a
        href={redirectAuthUrl}
        className="px-10 py-3 bg-green-500 rounded-full text-xl"
      >
        Login here
      </a>
    </section>
  );
};
