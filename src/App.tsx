import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "./LandingPage/Navbar/Navbar";
import {
  AuthCreateAccount,
  AuthCreatePassword,
  AuthForgotPassword,
  AuthLogin,
  AuthNewUserSetPassword,
  AuthOTPConfirmation,
  AuthOTPReset,
  AuthResetPassword,
} from "./Pages/Auth/Index.Auth";
import Dashboard from "./Pages/Home/Dashboard/Dashboard";
import Profile from "./Pages/Home/Profile/Index";
import UsersPage from "./Pages/Home/Users/Index";
import Settings from "./Pages/Home/Settings/Index";
import Frontdesk from "./Pages/Home/Settings/FrontDeskDepartments";
import TicketDashboard from "./Pages/Home/Tickets/Tickets";
import NotFound from "./Pages/Utils/NotFound/NotFound";
import SetAddedUserPasswordToken from "./Pages/Auth/SetPasswordToken";
import LandingPageIndex from "./LandingPage/LandingPageIndex";

const App: React.FC = () => {
  const isLoggedIn = !!localStorage.getItem("srm_access_token");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Content />} />
        {[
          "create-account",
          "login",
          "otp",
          "create-password",
          "reset-password",
          "forgot-password",
          "user-set-password",
          "otp-reset-password",
          "user-create-password",
        ].map((path) => (
          <Route
            key={path}
            path={`/${path}`}
            element={
              isLoggedIn ? (
                <Navigate to="/home" />
              ) : (
                React.createElement(AuthRoutes[path as keyof typeof AuthRoutes])
              )
            }
          />
        ))}
        <Route path="/home" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/frontdesk" element={<Frontdesk />} />
        <Route path="/tickets" element={<TicketDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

const Content: React.FC = () => (
  <>
    <Navbar />
    <LandingPageIndex />
  </>
);

type AuthRoutes = {
  [key in
    | "create-account"
    | "login"
    | "otp"
    | "create-password"
    | "reset-password"
    | "forgot-password"
    | "user-set-password"
    | "otp-reset-password"
    | "user-create-password"]: React.FC;
};

const AuthRoutes: AuthRoutes = {
  "create-account": AuthCreateAccount,
  'login': AuthLogin,
  'otp': AuthOTPConfirmation,
  "create-password": AuthCreatePassword,
  "reset-password": AuthResetPassword,
  "forgot-password": AuthForgotPassword,
  "user-set-password": SetAddedUserPasswordToken,
  "otp-reset-password": AuthOTPReset,
  "user-create-password": AuthNewUserSetPassword,
};

export default App;