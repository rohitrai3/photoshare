import { useState } from "react";
import {
  CloseIcon,
  DislikeIcon,
  DislikeOutlineIcon,
  FeedbackIcon,
  LikeIcon,
  LikeOutlineIcon,
  SpinnerIcon,
} from "../../common/icons";
import { FeedbackStatus } from "../../common/enums";
import { FeedbackData } from "../../common/types";
import { v4 as uuid } from "uuid";
import { saveFeedback } from "../../services/database";
import { useAppSelector } from "../../hooks/hooks";
import { selectUsername } from "../../store/slices/userSlice";

export type FeedbackProps = {
  setIsOpenFeedbackDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Feedback({ setIsOpenFeedbackDialog }: FeedbackProps) {
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackStatus, setFeedbackStatus] = useState<FeedbackStatus | null>(
    null
  );
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);
  const userUsername = useAppSelector(selectUsername);
  const isDisable = feedbackMessage.length === 0 && feedbackStatus === null;

  const getDisableStyle = () => {
    if (isDisable) {
      return "disable-button";
    }
  };

  const showLikeIcon = () => {
    return feedbackStatus === FeedbackStatus.LIKE ? LikeIcon : LikeOutlineIcon;
  };

  const showDislikeIcon = () => {
    return feedbackStatus === FeedbackStatus.DISLIKE
      ? DislikeIcon
      : DislikeOutlineIcon;
  };

  const sendFeedback = async () => {
    setIsSendingFeedback(true);
    const feedback: FeedbackData = {
      uid: uuid(),
      message: feedbackMessage.trim(),
      status: feedbackStatus!,
      timestamp: Date.now(),
    };
    await saveFeedback(userUsername, feedback);
    setIsOpenFeedbackDialog(false);
    setIsSendingFeedback(false);
  };

  const feedbackButton = (
    <button
      className={`feedback-submit-button primary on-primary-text ${getDisableStyle()}`}
      onClick={() => sendFeedback()}
      disabled={isDisable}
      id="sendFeedbackButton"
    >
      Submit
    </button>
  );

  const showSubmitFeedbackButton = () => {
    return isSendingFeedback ? SpinnerIcon : feedbackButton;
  };

  return (
    <div className="feedback">
      <div className="dialog-background shadow" />
      <div className="dialog-container">
        <div className="feedback-dialog-container">
          <div className="feedback-dialog surface-container-high">
            <div
              className="feedback-dialog-close-button tertiary"
              onClick={() => setIsOpenFeedbackDialog(false)}
            >
              {CloseIcon}
            </div>
            <div className="feedback-icon">{FeedbackIcon}</div>
            <div className="feedback-label on-surface-text headline-small">
              Feedback
            </div>
            <div className="feedback-input">
              <textarea
                className="secondary-container on-secondary-container-text body-medium"
                value={feedbackMessage}
                placeholder="Enter a message..."
                onChange={(event) => setFeedbackMessage(event.target.value)}
              />
            </div>
            <div className="feedback-status">
              <div
                className="feedback-status-like"
                onClick={() => setFeedbackStatus(FeedbackStatus.LIKE)}
              >
                {showLikeIcon()}
              </div>
              <div
                className="feedback-status-dislike"
                onClick={() => setFeedbackStatus(FeedbackStatus.DISLIKE)}
              >
                {showDislikeIcon()}
              </div>
              {showSubmitFeedbackButton()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
