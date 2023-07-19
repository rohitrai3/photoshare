import { useNavigate } from "react-router-dom";
import { userSignOut } from "../../services/authenticate";
import { useState } from "react";
import Feedback, { FeedbackProps } from "./Feedback";

export default function UserFooter() {
  const navigate = useNavigate();
  const [isOpenFeedbackDialog, setIsOpenFeedbackDialog] = useState(false);
  const feedbackProps: FeedbackProps = {
    setIsOpenFeedbackDialog: setIsOpenFeedbackDialog,
  };

  const signOutUser = () => {
    userSignOut();
    navigate("/");
  };

  const showFeedbackDialog = () => {
    if (isOpenFeedbackDialog) {
      return <Feedback {...feedbackProps} />;
    }
  };

  return (
    <div className="user-footer label-large">
      <button
        className="sign-out-button tertiary on-tertiary-text"
        onClick={() => signOutUser()}
      >
        Sign out
      </button>
      <button
        className="feedback-button secondary on-secondary-text"
        onClick={() => setIsOpenFeedbackDialog(!isOpenFeedbackDialog)}
      >
        Feedback
      </button>
      <a href="https://www.rohitrai.dev">
        <button className="portfolio-button">Portfolio</button>
      </a>
      {showFeedbackDialog()}
    </div>
  );
}
