import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SecondPage: React.FC = () => {
  const [user, setUser] = useState({ ...JSON.parse(localStorage.getItem("user") as any) });
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("user")) {
      return navigate("/");
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div>
      <h1>Welcome to Second Page</h1>
      <h4>Name: {user.name}</h4>
      <h4>Email: {user.email}</h4>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};
export default SecondPage;
