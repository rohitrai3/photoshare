import SignInFooter from "./SignInFooter";
import SignInForm from "./SignInForm";
import SignInHeader from "./SignInHeader";

export default function SignIn() {
  return (
    <div className="sign-in background on-background-text">
      <SignInHeader />
      <SignInForm />
      <SignInFooter />
    </div>
  );
}
