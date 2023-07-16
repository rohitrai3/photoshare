import { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { authenticatedRouter, router } from "../router/router";
import "../styles/theme.css";
import { SpinnerIcon } from "../common/icons";
import { checkUserSignedIn } from "../services/authenticate";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);

  const getRoutes = () => {
    if (isLoading) {
      return SpinnerIcon;
    } else if (isUserSignedIn) {
      return <RouterProvider router={authenticatedRouter} />;
    } else {
      return <RouterProvider router={router} />;
    }
  };

  useEffect(() => {
    checkUserSignedIn(setIsLoading, setIsUserSignedIn);
  }, []);

  return getRoutes();
}

export default App;
