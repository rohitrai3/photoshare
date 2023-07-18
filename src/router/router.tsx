import { RouteObject, createBrowserRouter } from "react-router-dom";
import SignIn from "../components/sign_in";
import Home from "../components/home";
import { AddPost } from "../components/post";
import Contacts from "../components/contacts";
import User from "../components/user";

const signIn: RouteObject = {
  path: "/",
  element: <SignIn />,
};

const home: RouteObject = {
  path: "/",
  element: <Home />,
};

const addPost: RouteObject = {
  path: "/add_post",
  element: <AddPost />,
};

const contacts: RouteObject = {
  path: "/contacts",
  element: <Contacts />,
};

const user: RouteObject = {
  path: "/user",
  element: <User />,
};

export const router = createBrowserRouter([signIn]);

export const authenticatedRouter = createBrowserRouter([
  home,
  addPost,
  contacts,
  user,
]);
