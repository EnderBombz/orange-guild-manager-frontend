import React, { useState, useContext } from "react";
import { Context } from "./../context/AuthContext";
import { InputAdornment, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AccountCircle, Lock } from "@mui/icons-material";
import "../css/login.css";

export default function Login(props) {
  const navigate = useNavigate();

  const { authenticated, handleLogin, response } = useContext(Context);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (email) => {
    setEmail(email);
  };

  const handlePassword = (password) => {
    setPassword(password);
  };

  return (
    <>
      <div className="background-color">
        <div className="flex-box">
          <div className="content-box">
            <div className="box">
              <img src="https://frixs.github.io/BlackSpiritHelper/img/logo_white_512.png" />
              <h1 className="box-tittle">S.E.C.H</h1>
              {response !== "" ? (
                <>
                  <div className="return-message">{response}</div>
                </>
              ) : (
                <></>
              )}
              <form>
                <div className="box-text">
                  <TextField
                    type="email"
                    label="Email"
                    onChange={(e) => {
                      handleEmail(e.target.value);
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle />
                        </InputAdornment>
                      )
                    }}
                  />
                </div>
                <div className="box-text">
                  <TextField
                    type="password"
                    onChange={(e) => {
                      handlePassword(e.target.value);
                    }}
                    label="Senha"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock />
                        </InputAdornment>
                      )
                    }}
                  />
                </div>
                <div className="box-button">
                  <Button
                    onClick={() => {
                      handleLogin(email, password);
                    }}
                    variant="contained"
                    fullWidth
                    color="primary"
                  >
                    Entrar
                  </Button>

                  <h6>Esqueceu a senha?</h6>
                </div>
                <div className="box-top-border">
                  <Button
                    onClick={() => {
                      navigate("/cadastro");
                    }}
                    variant="contained"
                    color="primary"
                  >
                    Criar nova conta
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
