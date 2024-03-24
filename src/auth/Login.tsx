import * as React from "react";
import { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { data, doFetch, loading } = useFetch("/auth/");
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

    doFetch(config);
  };

  if (data) {
    localStorage.setItem("token", data || "");
    navigate("/");
  }
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            onChange={handleUserNameChange}
            type="text"
            name="username"
            id="username"
            value={username}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            onChange={handlePasswordChange}
            type="password"
            name="password"
            id="password"
            value={password}
          />
        </div>
        <button disabled={loading}>Login</button>
      </form>
    </div>
  );
};
