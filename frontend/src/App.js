import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import UpdateInfo from "./components/UpdateInfo";
import ChangePassowrd from "./components/ChangePassowrd";

function App() {
  const [user, setuser] = useState(null);
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login setUser={setuser} />} />
        <Route path="/login" element={<Login setUser={setuser} />} />
        <Route path="/update-info" element={<UpdateInfo user={user} />} />
        <Route
          path="/change-password"
          element={<ChangePassowrd user={user} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
