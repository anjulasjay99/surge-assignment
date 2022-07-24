import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import UpdateInfo from "./components/UpdateInfo";
import ChangePassowrd from "./components/ChangePassowrd";
import Users from "./components/Users";
import Notes from "./components/Notes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/update-info" element={<UpdateInfo />} />
        <Route path="/change-password" element={<ChangePassowrd />} />
        <Route path="/users" element={<Users />} />
        <Route path="/notes" element={<Notes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
