import * as React from "react";
import { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { Navigate, useNavigate } from "react-router-dom";
import { useLocalStorage } from "@uidotdev/usehooks";
import { addAxiosToken } from "../requests/fetchApi";
import { Label } from "../common/Label";
import { Button } from "../common/Button";

const inputClassnames =
  "border border-solid border-gray-300 rounded-md px-4 py-2 w-full";

export const Login = () => {
  const { data, doFetch, loading, error } = useFetch("/auth/");
  const [token, setToken] = useLocalStorage("token", null);
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = `${username}:${password}`;
    const encodedToken = btoa(token);
    const config = {
      headers: { Authorization: "Basic " + encodedToken },
    };

    doFetch({ config });
  };

  if (data) {
    setToken(data);
    addAxiosToken(data);
    navigate("/");
  }
  return token ? (
    <Navigate to="/" />
  ) : (
    <div className="grow flex justify-center items-center flex-col gap-2">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="username">Username</Label>
          <input
            className={inputClassnames}
            onChange={handleUserNameChange}
            type="text"
            name="username"
            id="username"
            value={username}
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <input
            className={inputClassnames}
            onChange={handlePasswordChange}
            type="password"
            name="password"
            id="password"
            value={password}
          />
        </div>
        <Button disabled={loading}>Login</Button>
      </form>
      {error && <div className="text-red-600">oups, there is an error...</div>}
    </div>
  );
};
