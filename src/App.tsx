import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Login } from "./auth/Login";
import { Home } from "./common/Home";
import { Layout } from "./layout/Layout";
import { Logout } from "./auth/Logout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
