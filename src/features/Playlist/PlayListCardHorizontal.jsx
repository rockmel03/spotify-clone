export const PlayListCardHorizontal = ({ playlist }) => {
  return (
    <div className="flex gap-2 bg-zinc-600/20 hover:bg-zinc-600/40 ease duration-300 rounded">
      <div className="w-[20%] aspect-square rounded bg-zinc-700">
        <img
          src={playlist?.images[0]?.url}
          alt={playlist?.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="px-1 py-2">
        <h3 className="font-medium">{playlist?.name}</h3>
      </div>
    </div>
  );
};
