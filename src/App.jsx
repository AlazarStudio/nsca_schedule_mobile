import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import SplashScreen from "./Components/Pages/SplashScreen";
import Login from "./Components/Pages/Login";
import Main_Page from "./Components/Pages/Main_Page";
import Schedule_Page from "./Components/Pages/Schedule_Page";
import Profile_Page from "./Components/Pages/Profile_Page";
import Non_Found_Page from "./Components/Pages/Non_Found_Page";
import Layout from "./Components/Standart/Layout/Layout";

function App() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user = Cookies.get("currentUser")
  const currentUser = user && JSON.parse(user);

  useEffect(() => {
    if (currentUser) {
      setIsAuthorized(true);
      setTimeout(() => {
        setLoading(false);
        if (window.location.pathname === "/") {
          navigate("/main");
        }
      }, 1000);
    } else {
      setIsAuthorized(false);
      setLoading(false);
      navigate("/login");
    }
  }, [navigate]);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={isAuthorized ? <Main_Page currentUser={currentUser} /> : <Login />} />
        <Route path="/main" element={<Main_Page currentUser={currentUser} />} />
        <Route path="/schedule" element={<Schedule_Page currentUser={currentUser} />} />
        <Route path="/profile" element={<Profile_Page currentUser={currentUser} />} />
        <Route path="/login" element={<Login currentUser={currentUser} />} />
        <Route path="*" element={<Non_Found_Page />} />
      </Route>
    </Routes>
  );
}

export default App;
