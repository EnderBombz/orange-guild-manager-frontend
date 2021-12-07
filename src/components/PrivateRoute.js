import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "../context/AuthContext";
import { MoonLoader } from "react-spinners";

export default function PrivateRoute({ children }) {
  const { authenticated, loading } = useContext(Context);
  let [color, setColor] = useState("#fa8505");

  if (loading) {
    return (
      <MoonLoader
        size={60}
        loading={loading}
        speedMultiplier={1}
        color={"#FA8505"}
      />
    );
  }

  if (!authenticated) {
    return <Navigate to="/login" />;
  }

  return children;
}
