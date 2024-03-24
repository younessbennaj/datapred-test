import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Login } from "./auth/Login";
import { Main } from "./common/Main";
import { Layout } from "./layout/Layout";
import { Logout } from "./auth/Logout";
import { addAxiosToken } from "./requests/fetchApi";
import { useLocalStorage } from "@uidotdev/usehooks";

function App() {
  const [token] = useLocalStorage("token", null);

  token && addAxiosToken(token);
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
