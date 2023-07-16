import { RouteObject, createBrowserRouter } from "react-router-dom";
import SignIn from "../components/sign_in";
import Home from "../components/home";

const signIn: RouteObject = {
  path: "/",
  element: <SignIn />,
};

const home: RouteObject = {
  path: "/",
  element: <Home />,
};

export const router = createBrowserRouter([signIn]);

export const authenticatedRouter = createBrowserRouter([home]);
