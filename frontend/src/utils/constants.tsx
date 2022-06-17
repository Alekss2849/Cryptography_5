import Welcome from "../components/content/guest/Welcome";
import Login from "../components/content/auth/Login";
import AdminPanel from "../components/content/admin/AdminPanel";
import Registration from "../components/content/auth/Registration";

export const ACTIONS = {
  USER: {
    SET_USER: "SET_USER",
    SET_READY_USER: "SET_READY_USER",
    LOG_OUT: "LOG_OUT",
    REGISTRATION: "REGISTRATION"
  }
};

export const authAdminRoutes = [
  {
    path: '/admin',
    Component: <AdminPanel/>
  },
];

export const guestRoutes = [
  {
    path: '/welcome',
    Component: <Welcome/>
  },
  {
    path: '/login',
    Component: <Login/>
  },
  {
    path: '/registration',
    Component: <Registration/>
  },
];
