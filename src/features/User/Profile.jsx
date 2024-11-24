import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useApiPrivate from "../../hooks/useApiPrivate";

export const Profile = () => {
  const { id } = useParams();
  const [auth] = useAuth();
  const api = useApiPrivate();

  const [user, setuser] = useState(id ? {} : auth?.user || {});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      api
        .get(`/users/${id}`)
        .then((res) => setuser(res.data))
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [id]);

  return isLoading ? (
    <p>Loading...</p>
  ) : !user ? (
    <p>User not Found</p>
  ) : (
    <section className="w-full h-full p-5">
      <div className="flex items-center gap-5">
        <div className="rounded-full">
          <img
            src={user?.images[0].url}
            alt={user.display_name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="opacity-80">Profile</p>
          <h1 className="text-5xl lg:text-[8vw] font-bold">
            {user?.display_name}
          </h1>
          <h3 className="opacity-80">Followers: {user?.followers?.total}</h3>
        </div>
      </div>

      <ul>
        <h4 className="opacity-70">External Urls</h4>
        {Object.entries(user?.external_urls).map(([name, url]) => (
          <li key={url}>
            <a
              href={url}
              className="hover:underline capitalize"
              target="_blank"
            >
              {name}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};
