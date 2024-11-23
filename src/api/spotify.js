const baseAuthUrl = "https://accounts.spotify.com";
const CLIENT_ID = import.meta.env.VITE_API_CLIENT_ID;

const scope = [
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "user-read-email",
  "user-read-private",
  "playlist-read-private",
  "playlist-read-collaborative",
  "playlist-modify-private",
  "playlist-modify-public",
];

const params = new URLSearchParams();
params.append("client_id", CLIENT_ID);
params.append("response_type", "token");
params.append("redirect_uri", "http://localhost:5173/");
params.append("scope", scope.join(" "));

export const redirectAuthUrl = `${baseAuthUrl}/authorize?${params.toString()}`;

export const getAccessTokenFromUrl = () => {
  const hash = window.location.hash;
  if (hash) {
    const hashedObj = hash
      .substring(1)
      .split("&")
      .reduce((prev, curr) => {
        const splitedVal = curr.split("=");
        prev[splitedVal[0]] = splitedVal[1];
        return prev;
      }, {});

    return hashedObj?.access_token;
  }
};
