import { createBrowserRouter } from "react-router-dom";
import SignIn from "../components/sign_in";

const signIn = {
  path: "/",
  element: <SignIn />,
};

export const router = createBrowserRouter([signIn]);
