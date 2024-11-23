import { redirectAuthUrl } from "./spotify";

export const Login = () => {
  return (
    <div>
      <h1>Login with spotify</h1>
      <a href={redirectAuthUrl}>Login</a>
    </div>
  );
};
