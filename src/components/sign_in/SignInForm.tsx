import { useState } from "react";
import { GoogleIcon } from "../../common/icons";
import { signIn } from "../../services/authenticate";

export type SignInFormProps = {
  setSigningIn: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SignInForm({ setSigningIn }: SignInFormProps) {
  const [username, setUsername] = useState("");

  const updateUsername = () => {
    const usernameInputValue = (
      document.getElementById("usernameInput") as HTMLInputElement
    ).value;
    setUsername(usernameInputValue.trim().toLowerCase());
  };

  const signInUser = async () => {
    setSigningIn(true);
    sessionStorage.setItem("username", username);
    await signIn();
    setSigningIn(false);
  };

  return (
    <div className="sign-in-form">
      <div className="select-user-type label-large">
        New user
        <div className="select-user-type-switch">
          <div className="switch-track-new-user surface-container-highest">
            <div className="switch-handle-new-user outline"></div>
          </div>
        </div>
        Existing user
      </div>
      <input
        className="body-large primary-container on-primary-container-text"
        type="text"
        placeholder="Enter unique username"
        value={username}
        id="usernameInput"
        onChange={() => updateUsername()}
      />
      <button
        className="primary label-large on-primary-text"
        onClick={() => signInUser()}
      >
        {GoogleIcon} Sign in with Google
      </button>
    </div>
  );
}
