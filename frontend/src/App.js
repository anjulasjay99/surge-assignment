import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import UpdateInfo from "./components/UpdateInfo";
import ChangePassowrd from "./components/ChangePassowrd";
import Users from "./components/Users";
import Notes from "./components/Notes";

function App() {
  const [user, setuser] = useState(null);

  useEffect(() => {
    const usr = sessionStorage.getItem("user");
    if (usr) {
      setuser(usr);
      console.log(usr);
    }
  }, []);

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
        <Route
          path="/users"
          element={<Users user={user} setUser={setuser} />}
        />
        <Route
          path="/notes"
          element={<Notes user={user} setUser={setuser} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
