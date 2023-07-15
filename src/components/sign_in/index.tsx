import { useState } from "react";
import SignInFooter from "./SignInFooter";
import SignInForm, { SignInFormProps } from "./SignInForm";
import SignInHeader from "./SignInHeader";
import { SpinnerIcon } from "../../common/icons";

export default function SignIn() {
  const [signingIn, setSigningIn] = useState(false);
  const signInFormProps: SignInFormProps = {
    setSigningIn: setSigningIn,
  };

  const showSignInForm = () => {
    if (signingIn) {
      return <div className="sign-in-loading">{SpinnerIcon}</div>;
    } else {
      return <SignInForm {...signInFormProps} />;
    }
  };

  return (
    <div className="sign-in background on-background-text">
      <SignInHeader />
      {showSignInForm()}
      <SignInFooter />
    </div>
  );
}
