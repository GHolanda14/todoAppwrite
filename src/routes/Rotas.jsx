import React, { useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "../pages/Register/Register";
import ConfirmEmail from "../pages/ConfirmEmail/ConfirmEmail";
import Login from "../pages/Login/Login";
import Profile from "../pages/Profile/Profile";
import { account } from "../config/appWriteConfig";
import { TodoContext } from "../context/TodosContext";

const Rotas = () => {
  const { user, setUser } = useContext(TodoContext);
  useEffect(() => {
    account.get().then(
      (res) => setUser(res),
      (err) => console.log(err)
    );
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
