import logo from "../../assets/images/Spotify_logo.png";
import { requestUserAuthorization } from "./auth";

export const Login = () => {
  const handleLoginClick = () => {
    requestUserAuthorization();
  };

  return (
    <section className="w-full h-screen p-[10vw] flex flex-col items-center justify-center gap-20 bg-zinc-900 text-white">
      <img
        src={logo}
        alt="spotify logo"
        className="max-w-[300px] lg:max-w-[600px]"
      />
      <button
        onClick={handleLoginClick}
        className="px-10 py-3 bg-green-500 rounded-full text-xl"
      >
        Login with spotify
      </button>
    </section>
  );
};
