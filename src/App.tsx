import React, { useEffect } from "react";
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
import OverdueTickets from "./Pages/Home/Tickets/TicketsStatus/Overdue";
import ClosedTickets from "./Pages/Home/Tickets/TicketsStatus/Closed";
import NewTickets from "./Pages/Home/Tickets/TicketsStatus/NewTickets";
import ResolvedTickets from "./Pages/Home/Tickets/TicketsStatus/Resolved";
import DueTickets from "./Pages/Home/Tickets/TicketsStatus/Due";
import MediumTickets from "./Pages/Home/Tickets/TicketsPrority/Medium";
import LowTickets from "./Pages/Home/Tickets/TicketsPrority/Low";
import HighTickets from "./Pages/Home/Tickets/TicketsPrority/High";

const App: React.FC = () => {
  const isLoggedIn = !!localStorage.getItem("srm_access_token");

  useEffect(() => {
    const currentPath = window.location.pathname;
    const protectedPaths = [
      "/home",
      "/profile",
      "/users",
      "/settings",
      "/frontdesk",
      "/tickets",
      "/ticket-by-prority",
      "/overdue-tickets",
      "/due-tickets",
      "/closed-tickets",
      "/new-tickets",
      "/resolved-tickets",
      "/priority-medium-tickets",
      "/priority-low-tickets",
      "/priority-high-tickets",
    ];

    if (!isLoggedIn && protectedPaths.includes(currentPath)) {
      window.location.reload();
    }
  }, [isLoggedIn]);

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
        <Route path="/ticket-by-prority" element={<OverdueTickets />} />
        <Route path="/overdue-tickets" element={<OverdueTickets />} />
        <Route path="/due-tickets" element={<DueTickets />} />
        <Route path="/closed-tickets" element={<ClosedTickets />} />
        <Route path="/new-tickets" element={<NewTickets />} />
        <Route path="/resolved-tickets" element={<ResolvedTickets />} />
        <Route path="/priority-medium-tickets" element={<MediumTickets />} />
        <Route path="/priority-low-tickets" element={<LowTickets />} />
        <Route path="/priority-high-tickets" element={<HighTickets />} />

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
  login: AuthLogin,
  otp: AuthOTPConfirmation,
  "create-password": AuthCreatePassword,
  "reset-password": AuthResetPassword,
  "forgot-password": AuthForgotPassword,
  "user-set-password": SetAddedUserPasswordToken,
  "otp-reset-password": AuthOTPReset,
  "user-create-password": AuthNewUserSetPassword,
};

export default App;
