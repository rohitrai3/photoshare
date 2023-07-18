import { userSignOut } from "../../services/authenticate";

export default function UserFooter() {
  return (
    <div className="user-footer label-large">
      <button
        className="sign-out-button tertiary on-tertiary-text"
        onClick={() => userSignOut()}
      >
        Sign out
      </button>
      <a href="https://www.rohitrai.dev">
        <button className="portfolio-button">Portfolio</button>
      </a>
    </div>
  );
}
