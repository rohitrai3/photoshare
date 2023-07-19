import { useNavigate } from "react-router-dom";
import { userSignOut } from "../../services/authenticate";

export default function UserFooter() {
  const navigate = useNavigate();

  const signOutUser = () => {
    userSignOut();
    navigate("/");
  };

  return (
    <div className="user-footer label-large">
      <button
        className="sign-out-button tertiary on-tertiary-text"
        onClick={() => signOutUser()}
      >
        Sign out
      </button>
      <a href="https://www.rohitrai.dev">
        <button className="portfolio-button">Portfolio</button>
      </a>
    </div>
  );
}
