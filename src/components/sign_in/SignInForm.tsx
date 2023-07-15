import { GoogleIcon } from "../../common/icons";

export default function SignInForm() {
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
      />
      <button className="primary label-large on-primary-text">
        {GoogleIcon} Sign in with Google
      </button>
    </div>
  );
}
