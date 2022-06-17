import Blog from "../components/content/guest/Blog";
import Login from "../components/content/auth/Login";
import AdminPanel from "../components/content/admin/AdminPanel";

export const ACTIONS = {
  POSTS: {
    SET_POSTS: "POSTS.SET_POSTS",
    SET_PAGE: "POSTS.SET_PAGE",
    SET_READY_POSTS: "POSTS.SET_READY_POSTS",
    SET_FILTERED_ARRAY: "POSTS.SET_FILTERED_ARRAY",
    DELETE_POST: "POSTS.DELETE_POST",
    UPDATE_POST: "POSTS.UPDATE_POST",
    ADD_POST: "POSTS.ADD_POST",
    CLEAR_FILTERED: "POSTS.CLEAR_FILTERED",
    SORT: "POSTS.SORT"
  },
  USER: {
    SET_USER: "SET_USER",
    SET_READY_USER: "SET_READY_USER",
    LOG_OUT: "LOG_OUT",
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
    path: '/blog',
    Component: <Blog/>
  }, {
    path: '/login',
    Component: <Login/>
  },

];
