import { useState } from "react";
import { GoogleIcon } from "../../common/icons";
import { UserType } from "../../common/enums";
import { userSignIn } from "../../services/authenticate";

export type SignInFormProps = {
  setSigningIn: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SignInForm({ setSigningIn }: SignInFormProps) {
  const [username, setUsername] = useState("");
  const [userType, setUserType] = useState(UserType.EXISTING);

  const signInUser = async () => {
    setSigningIn(true);
    sessionStorage.setItem("username", username);
    sessionStorage.setItem("userType", userType);
    await userSignIn();
    setSigningIn(false);
  };

  const toggleUserType = () => {
    if (userType === UserType.NEW) {
      setUserType(UserType.EXISTING);
    } else {
      setUserType(UserType.NEW);
    }
  };

  const newUserSwitch = (
    <div className="switch-track-new-user surface-container-highest">
      <div className="switch-handle-new-user outline"></div>
    </div>
  );

  const existingUserSwitch = (
    <div className="switch-track-existing-user primary">
      <div className="switch-handle-existing-user on-primary"></div>
    </div>
  );

  const showSelectUserTypeSwitch = () => {
    if (userType === UserType.NEW) {
      return newUserSwitch;
    } else {
      return existingUserSwitch;
    }
  };

  const usernameInput = (
    <input
      className="body-large primary-container on-primary-container-text"
      type="text"
      placeholder="Enter unique username"
      value={username}
      onChange={(event) => setUsername(event.target.value.trim().toLowerCase())}
    />
  );

  const showUsernameInput = () => {
    if (userType === UserType.NEW) {
      return usernameInput;
    }
  };

  const disableSignInButton: boolean =
    userType === UserType.NEW &&
    ((username.length === 0 ||
      username.match(/\.|\#|\$|\[|\]|\//g)) as boolean);

  const getDisableButtonStyle = () => {
    if (disableSignInButton) {
      return "disable-button";
    }
  };

  document.onkeydown = (event) => {
    if (event.key === "Enter") {
      (document.getElementById("signInButton") as HTMLButtonElement).click();
    }
  };

  return (
    <div className="sign-in-form">
      <div className="select-user-type label-large">
        New user
        <div
          className="select-user-type-switch"
          onClick={() => toggleUserType()}
        >
          {showSelectUserTypeSwitch()}
        </div>
        Existing user
      </div>
      {showUsernameInput()}
      <button
        className={`${getDisableButtonStyle()} primary label-large on-primary-text`}
        onClick={() => signInUser()}
        disabled={disableSignInButton}
        id="signInButton"
      >
        {GoogleIcon} Sign in with Google
      </button>
    </div>
  );
}
