import React, { useContext, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { account } from "../config/appWriteConfig";
import { TodoContext } from "../context/TodosContext";
import ConfirmEmail from "../pages/ConfirmEmail/ConfirmEmail";
import Login from "../pages/Login/Login";
import Profile from "../pages/Profile/Profile";
import Register from "../pages/Register/Register";

const Rotas = () => {
  const { user, setUser } = useContext(TodoContext);

  useEffect(() => {
    if (localStorage.getItem("cookieFallback").includes("session")) {
      account.get().then(
        (res) => setUser(res),
        (err) => console.log(err.message)
      );
    }
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/login"
          element={user ? <Navigate to={"/profile"} /> : <Login />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to={"/profile"} /> : <Register />}
        />
        <Route path="/confirmEmail" element={<ConfirmEmail />} />
        <Route
          path="/profile"
          element={!user ? <Navigate to={"/login"} /> : <Profile />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Rotas;
