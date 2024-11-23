const URL = "https://accounts.spotify.com/api/token";
const CLIENT_ID = import.meta.env.VITE_API_CLIENT_ID;
const CLIENT_SECRET_ID = import.meta.env.VITE_API_CLIENT_SECRET;

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

export const redirectAuthUrl = `https://accounts.spotify.com/authorize?${params.toString()}`;

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

// export const requestAccessToken = async () => {
//   try {
//     const response = await axios.post(
//       URL,
//       {
//         grant_type: "client_credentials",
//         client_id: CLIENT_ID,
//         client_secret: CLIENT_SECRET_ID,
//       },
//       {
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//         withCredentials: true,
//       }
//     );

//     console.log(response.data);
//   } catch (error) {
//     F;
//     console.error(error);
//   }
// };
