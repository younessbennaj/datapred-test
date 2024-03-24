import { useNavigate } from "react-router-dom";
import { Button } from "./Button";

export const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="grow flex flex-col justify-center text-cente items-center">
      <h1>Home</h1>
      <p>Welcome to the home page!</p>
      <Button
        className="w-[50%]"
        onClick={() => {
          navigate("/login");
        }}
      >
        Login
      </Button>
    </div>
  );
};
