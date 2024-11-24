import { useNavigate } from "react-router-dom";
import { ArrowLeftNav, ArrowRightNav, UserIcon } from "../assets/icons";
import useAuth from "../hooks/useAuth";

export const TopNav = () => {
  const [auth] = useAuth();
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <nav
      style={{ backgroundImage: "linear-gradient(#18181b 83%,transparent)" }}
      className="sticky top-0 z-[9] py-5 w-full flex items-center justify-between"
    >
      <div className="flex items-center gap-2">
        <div className="w-10 aspect-square rounded-full bg-black hover:bg-zinc-800 font-semibold  grid place-items-center cursor-pointer active:scale-[.9] duration-150 ease-out">
          <ArrowLeftNav />
        </div>
        <div className="w-10 aspect-square rounded-full bg-black hover:bg-zinc-800 font-semibold  grid place-items-center cursor-pointer active:scale-[.9] duration-150 ease-out">
          <ArrowRightNav />
        </div>
      </div>
      <div>
        <button
          onClick={handleProfileClick}
          className="w-10 aspect-square rounded-full grid place-items-center bg-black cursor-pointer overflow-hidden"
        >
          {auth?.user?.images?.length ? (
            <img src={auth.user.images[1].url} />
          ) : (
            <span className="text-2xl">
              <UserIcon />
            </span>
          )}
        </button>
      </div>
    </nav>
  );
};
