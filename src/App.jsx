import { Login } from "./features/auth/Login";
import { Layout } from "./components/Layout";
import { Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";
import { Profile } from "./features/User/Profile";
import { LikedTracks } from "./features/User/LikedTracks";
import PlaylistDetail from "./features/Playlist/PlaylistDetail";
import AuthCallback from "./features/auth/AuthCallback";

function App() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="callback" element={<AuthCallback />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="profile/:id?" element={<Profile />} />
        <Route path="liked" element={<LikedTracks />} />
        <Route path="playlist/:id?" element={<PlaylistDetail />} />

        {/* catch all it does not exist */}
        <Route path="*" element={<p>404 - Page not found</p>} />
      </Route>
    </Routes>
  );
}

export default App;
