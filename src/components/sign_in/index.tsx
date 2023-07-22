import { useEffect, useState } from "react";
import SignInFooter from "./SignInFooter";
import SignInForm, { SignInFormProps } from "./SignInForm";
import SignInHeader from "./SignInHeader";
import { CloseIcon, SpinnerIcon } from "../../common/icons";
import { incrementVisitorCounter } from "../../services/analytics/database";

export default function SignIn() {
  const [signingIn, setSigningIn] = useState(false);
  const signInFormProps: SignInFormProps = {
    setSigningIn: setSigningIn,
  };
  const [notification, setNotification] = useState(
    sessionStorage.getItem("error")
  );

  const showSignInForm = () => {
    if (signingIn) {
      return <div className="sign-in-loading">{SpinnerIcon}</div>;
    } else {
      return <SignInForm {...signInFormProps} />;
    }
  };

  const clearNotfication = () => {
    setNotification("");
    sessionStorage.removeItem("error");
  };

  const showNotification = () => {
    if (notification) {
      return (
        <div className="notification body-medium error on-error-text">
          {notification}
          <div onClick={() => clearNotfication()}>{CloseIcon}</div>
        </div>
      );
    }
  };

  const setVisitorCount = async () => {
    if (!(localStorage.getItem("isPhotoShareVisited") === "true")) {
      await incrementVisitorCounter("photoshare");
      localStorage.setItem("isPhotoShareVisited", "true");
    }
  };

  useEffect(() => {
    setVisitorCount();
  }, []);

  return (
    <div className="sign-in background on-background-text">
      <SignInHeader />
      {showSignInForm()}
      <SignInFooter />
      {showNotification()}
    </div>
  );
}
