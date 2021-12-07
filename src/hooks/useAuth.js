import { useState, useEffect } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function useAuth() {
  const navigate = useNavigate();

  const [authenticated, setAuthenticated] = useState(false);
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState("");

  function parseJwt(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      if (token === "undefined") {
        handleLogout();
      } else {
        api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
        setAuthenticated(true);
        let user_data = parseJwt(token);
        setUserData(user_data);
      }
    }

    setLoading(false);
  }, []);

  async function handleLogin(email, password) {
    try {
      const {
        data: { token, message }
      } = await api.post("/api/auth", { email, password });

      if (message) {
        setResponse(message);
      } else {
        localStorage.setItem("token", JSON.stringify(token));
        api.defaults.headers.Authorization = `Bearer ${token}`;
        setAuthenticated(true);
        let user_data = parseJwt(token);
        setUserData(user_data);
        setResponse("");
        navigate("/dashboard");
      }
    } catch (err) {
      console.debug(err);
    }
  }

  function handleLogout() {
    localStorage.removeItem("token");
    api.defaults.headers.Authorization = undefined;
    setAuthenticated(false);
    navigate("/login");
  }

  return {
    authenticated,
    loading,
    handleLogin,
    handleLogout,
    userData,
    response
  };
}
