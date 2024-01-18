import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LandingPageIndex from "./LandingPage/LandingPageIndex";
import Navbar from "./LandingPage/Navbar/Navbar";
import {
  AuthCreateAccount,
  AuthCreatePassword,
  AuthForgotPassword,
  AuthLogin,
  AuthOTPConfirmation,
  AuthOTPReset,
  AuthResetPassword,
} from "./Pages/Auth/Index.Auth";
import Dashboard from "./Pages/Home/Dashboard/Dashboard";
import YourComponent from "./Pages/Home/Testing";
import Profile from "./Pages/Home/Profile/Index";
import UsersPage from "./Pages/Home/Users/Index";
import Settings from "./Pages/Home/Settings/Index";

// const App: React.FC = () => {
//   const access_token = localStorage.getItem("access_token");
//   const isLoggedIn = !!access_token;
const App: React.FC = () => {
  const [isLoggedIn] = useState(() => {
    const srm_access_token = localStorage.getItem("srm_access_token");
    return !!srm_access_token;
  });
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Content />} />

        <Route
          path="/create-account"
          element={isLoggedIn ? <Navigate to="/home" /> : <AuthCreateAccount />}
        />
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/home" /> : <AuthLogin />}
        />
        <Route
          path="/otp"
          element={
            isLoggedIn ? <Navigate to="/home" /> : <AuthOTPConfirmation />
          }
        />
        <Route
          path="/create-password"
          element={
            isLoggedIn ? <Navigate to="/home" /> : <AuthCreatePassword />
          }
        />
        <Route
          path="/reset-password"
          element={isLoggedIn ? <Navigate to="/home" /> : <AuthResetPassword />}
        />
        <Route
          path="/forgot-password"
          element={
            isLoggedIn ? <Navigate to="/home" /> : <AuthForgotPassword />
          }
        />
        <Route
          path="/otp-reset-password"
          element={isLoggedIn ? <Navigate to="/home" /> : <AuthOTPReset />}
        />
        <Route path="/home" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/test" element={<YourComponent />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
};

const Content: React.FC = () => {
  return (
    <>
      <Navbar />
      <LandingPageIndex />
    </>
  );
};

export default App;

// const App: React.FC = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(() => {
//     const access_token = localStorage.getItem("access_token");
//     return !!access_token; // Use !! to convert to boolean
//   });
