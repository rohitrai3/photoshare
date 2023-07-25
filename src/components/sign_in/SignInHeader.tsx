import { PhotoShareLogo } from "../../common/icons";

export default function SignInHeader() {
  return (
    <div className="sign-in-header">
      <div className="display-small">Welcome to</div>
      <div className="sign-in-photoshare display-large">
        {PhotoShareLogo}PhotoShare
      </div>
    </div>
  );
}
