export const PlayListCard = ({ playlist }) => {
  return (
    <article className="min-w-48 p-2 hover:bg-zinc-800 rounded cursor-pointer ease duration-200">
      <div className="bg-zinc-700 w-full aspect-square rounded">
        <img
          src={playlist.images[0].url}
          alt={playlist.name}
          className="w-full h-full obj-cover"
        />
      </div>
      <div className="mt-1">
        <h2 className="text-base font-semibold">{playlist.name}</h2>
        <small className="text-sm opacity-80">
          {`${playlist.description.substring(0, 40)} ...`}
        </small>
      </div>
    </article>
  );
};
