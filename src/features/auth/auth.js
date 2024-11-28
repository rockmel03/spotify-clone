const CLIENT_ID = import.meta.env.VITE_API_CLIENT_ID;
const redirectUri = "http://localhost:5173/callback";

const authorizationEndpoint = "https://accounts.spotify.com/authorize";
const tokenEndpoint = "https://accounts.spotify.com/api/token";

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
  "user-library-read",
];

const generateRandomString = (length) => {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, curr) => {
    return acc + possible[curr % possible.length];
  }, "");
};

const sha256 = async (plain) => {
  const encoder = new TextEncoder();
  const encodedData = encoder.encode(plain);
  return crypto.subtle.digest("SHA-256", encodedData);
};

const bas64encode = (input) => {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
};

export const requestUserAuthorization = async () => {
  const codeVerifier = generateRandomString(64);
  const hashed = await sha256(codeVerifier);
  const codeChallenge = bas64encode(hashed);

  const authUrl = new URL(authorizationEndpoint);

  // save codeVerifier to local storage
  window.localStorage.setItem("code_verifier", codeVerifier);

  const params = new URLSearchParams();
  params.append("client_id", CLIENT_ID);
  params.append("response_type", "code");
  params.append("code_challenge_method", "S256");
  params.append("code_challenge", codeChallenge);
  params.append("redirect_uri", redirectUri);
  params.append("scope", scope.join(" "));

  authUrl.search = params.toString();
  window.location.href = authUrl.toString();
};

export const getUrlParams = () => {
  const urlParams = new URLSearchParams(window.location.search);
  //   const data = Object.fromEntries(urlParams.entries());
  const data = Array.from(urlParams.entries()).reduce((acc, [name, value]) => {
    acc[name] = value;
    return acc;
  }, {});
  console.log(data);
  return data;
};

export const requestAccessToken = async (code) => {
  let codeVerifier = localStorage.getItem("code_verifier");

  const payload = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: CLIENT_ID,
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
      code_verifier: codeVerifier,
    }),
  };

  const response = await fetch(tokenEndpoint, payload);
  return await response.json();
};

export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refresh_token");

  const payload = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: CLIENT_ID,
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  };

  const body = await fetch(tokenEndpoint, payload);
  const response = await body.json();

  if (response?.refresh_token) {
    localStorage.setItem("refresh_token", response.refresh_token);
  }

  return response;
};
