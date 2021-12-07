import React from "react";
import PrivateRoute from "../components/PrivateRoute";
import { AuthProvider } from "../context/AuthContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

import Login from "./../pages/login"

async function getCrescente() {
  try {
    const data = await axios
      .post(
        "https://blackdesert-tradeweb.playredfox.com/Home/GetItemSellBuyInfo",
        {
          headers: {
            accept: "*/*",
            "accept-language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "x-requested-with": "XMLHttpRequest"
          },
          body:
            "__RequestVerificationToken=o1DN2hyEboJNpMCe2eYGXK7dwSdwFySknfHzYJyISmLWf8dt8y0HreEmk-JwwBfxvDwVD63WCXZvocf7dmHOxCAygJPpJYBr577LrcUmrnY1&pricePerOne=510000&totalTradeCount=2470367&keyType=0&mainKey=9692&subKey=0&count=13129&name=Refei%C3%A7%C3%A3o+Simples+de+Cron&grade=4&mainCategory=35&subCategory=4&chooseKey=0&iconPath=url(%22https%3A%2F%2Fblackdesert-tradeweb.playredfox.com%2FTradeMarket%2FCommon%2Fimg%2FBDO%2Fitem%2F9692.png%22)&sumCountText=13129+Unids.&countText=13129+Unids.&isUp=true&selectPrice=480000"
        }
      )
      .then((response) => {
        console.data(response);
      });
  } catch (err) {
    console.log(err);
  }
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <h1>Main</h1>
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <>
                <h1>Dashboard</h1>
              </>
            }
          />
          <Route
            path="/login"
            element={
             <Login/>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
