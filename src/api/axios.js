import axios from "axios";

const api = axios.create({
  baseURL: "https://api.spotify.com/v1/",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

export default api;
