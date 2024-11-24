import { Login } from "./features/auth/Login";
import { Layout } from "./components/Layout";
import { Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";
import { Profile } from "./features/User/Profile";

function App() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="profile/:id?" element={<Profile />} />

        {/* catch all it does not exist */}
        <Route path="*" element={<p>404 - Page not found</p>} />
      </Route>
    </Routes>
  );
}

export default App;
