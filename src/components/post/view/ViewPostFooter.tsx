import { useState } from "react";
import { TickIcon } from "../../../common/icons";

export type ViewPostFooterProps = {
  caption: string;
};

export default function ViewPostFooter({ caption }: ViewPostFooterProps) {
  const [comment, setComment] = useState("");

  const updateComment = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  return (
    <div className="post-footer">
      <div className="post-caption label-large">
        <div className="post-caption-label">Caption</div>
        {caption}
      </div>
      <div className="view-post-comments">
        <div className="comment-heading on-surface-variant-text title-small">
          Messages
        </div>
      </div>
      <div className="add-comment">
        <input
          className="secondary-container on-secondary-container-text body-medium"
          type="text"
          placeholder="Add a comment..."
          value={comment}
          onChange={updateComment}
        />
        <div className="add-comment-button secondary">{TickIcon}</div>
      </div>
    </div>
  );
}
