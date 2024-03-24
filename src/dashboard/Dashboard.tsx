import { useEffect } from "react";
import { useFetch } from "../hooks/useFetch";

export const Dashboard = () => {
  const { data, doFetch } = useFetch("/flows/1");
  console.log(data);
  useEffect(() => {
    doFetch();
  }, [doFetch]);
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
};
