import { useEffect, useState } from "react";
import { SpinnerIcon, TickIcon } from "../../../common/icons";
import { getCommentWithUser, saveComment } from "../../../services/database";
import { CommentData, CommentDataWithUserInfo } from "../../../common/types";
import { v4 as uuid } from "uuid";
import { useAppSelector } from "../../../hooks/hooks";
import { selectUsername } from "../../../store/slices/userSlice";

export type ViewPostFooterProps = {
  postUid: string;
  caption: string;
};

export default function ViewPostFooter({
  postUid,
  caption,
}: ViewPostFooterProps) {
  const [commentsWithUser, setCommentsWithUser] = useState<
    CommentDataWithUserInfo[]
  >([]);
  const [commentText, setCommentText] = useState("");
  const [isSendingComment, setIsSendingComment] = useState(false);
  const userUsername = useAppSelector(selectUsername);
  const isDisable = commentText.trim().length === 0;

  const updateCommentText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommentText(event.target.value);
  };

  const getDisableStyle = () => {
    if (isDisable) {
      return "disable-button";
    }
  };

  const sendCommentButton = (
    <button
      className={`send-comment-button secondary ${getDisableStyle()}`}
      onClick={() => sendComment()}
      disabled={isDisable}
    >
      {TickIcon}
    </button>
  );

  const showSendCommentButton = () => {
    return isSendingComment ? SpinnerIcon : sendCommentButton;
  };

  const sendComment = async () => {
    setIsSendingComment(true);
    const comment: CommentData = {
      uid: uuid(),
      username: userUsername,
      comment: commentText.trim(),
      timestamp: Date.now(),
    };
    await saveComment(comment, postUid);
    setCommentText("");
    await loadComments();
    setIsSendingComment(false);
  };

  const showCaption = () => {
    if (caption.length > 0) {
      return (
        <div className="post-caption label-large">
          <div className="post-caption-label">Caption</div>
          {caption}
        </div>
      );
    }
  };

  const showComments = () => {
    if (commentsWithUser.length > 0) {
      return (
        <div className="view-post-comments">
          <div className="comments-label on-surface-variant-text title-small">
            Comments
          </div>
          {commentsWithUser.map((commentWithUser) => {
            return (
              <div className="comment-body" key={commentWithUser.comment.uid}>
                <div className="comment-user-info">
                  <img src={commentWithUser.user?.photoUrl} />
                  <div className="comment-user-info-username label-small">
                    @{commentWithUser.user?.username}
                  </div>
                </div>
                <div className="comment-text body-small">
                  {commentWithUser.comment.comment}
                </div>
              </div>
            );
          })}
        </div>
      );
    }
  };

  const loadComments = async () => {
    const fetchedComments = await getCommentWithUser(postUid);
    setCommentsWithUser(fetchedComments);
  };

  useEffect(() => {
    loadComments();
  }, []);

  console.log(commentsWithUser);

  return (
    <div className="view-post-footer">
      {showCaption()}
      {showComments()}
      <div className="add-comment">
        <input
          className="secondary-container on-secondary-container-text body-medium"
          type="text"
          placeholder="Add a comment..."
          value={commentText}
          onChange={updateCommentText}
        />
        {showSendCommentButton()}
      </div>
    </div>
  );
}
