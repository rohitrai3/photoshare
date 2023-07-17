import { RouteObject, createBrowserRouter } from "react-router-dom";
import SignIn from "../components/sign_in";
import Home from "../components/home";
import { AddPost } from "../components/post";

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

export const router = createBrowserRouter([signIn]);

export const authenticatedRouter = createBrowserRouter([home, addPost]);
