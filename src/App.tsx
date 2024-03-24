import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Login } from "./auth/Login";
import { Home } from "./common/Home";
import { Layout } from "./layout/Layout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
