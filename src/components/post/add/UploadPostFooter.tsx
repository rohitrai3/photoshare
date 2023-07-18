import { useState } from "react";
import { SpinnerIcon } from "../../../common/icons";
import { savePhoto } from "../../../services/storage";
import { PostData } from "../../../common/types";
import { v4 as uuid } from "uuid";
import { useAppSelector } from "../../../hooks/hooks";
import { selectUsername } from "../../../store/slices/userSlice";
import { saveBookmark, savePost } from "../../../services/database";
import { useNavigate } from "react-router-dom";

export type UploadPostFooterProps = {
  selectedPhoto: string;
  isBookmarked: boolean;
};

export default function UploadPostFooter({
  selectedPhoto,
  isBookmarked,
}: UploadPostFooterProps) {
  const [isSendingPost, setIsSendingPost] = useState(false);
  const [caption, setCaption] = useState("");
  const userUsername = useAppSelector(selectUsername);
  const isDisableButton = selectedPhoto.length === 0;
  const navigate = useNavigate();

  const updateCaption = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCaption(event.target.value);
  };

  const sendPost = async () => {
    setIsSendingPost(true);

    const uid = uuid();
    const photoDownloadUrl = await savePhoto(uid, selectedPhoto);

    const post: PostData = {
      uid: uid,
      username: userUsername,
      photoUrl: photoDownloadUrl,
      caption: caption.trim(),
      timestamp: Date.now(),
    };
    await savePost(userUsername, post);

    if (isBookmarked) {
      await saveBookmark(userUsername, post);
    }
    navigate("/");

    setIsSendingPost(false);
  };

  const getDisableButtonStyle = () => {
    if (isDisableButton) {
      return "disable-button";
    }
  };

  const postButton = (
    <button
      className={`${getDisableButtonStyle()} secondary on-secondary-text label-large`}
      onClick={() => sendPost()}
      disabled={isDisableButton}
    >
      Post
    </button>
  );

  const showPostButton = () => {
    return isSendingPost ? SpinnerIcon : postButton;
  };

  return (
    <div className="post-footer">
      <div className="post-caption label-large">
        <div className="post-caption-label">Caption</div>
        <div className="upload-post-caption-input">
          <input
            className="surface on-surface-text body-medium"
            type="text"
            placeholder="Enter a caption..."
            value={caption}
            onChange={updateCaption}
          />
        </div>
      </div>
      {showPostButton()}
    </div>
  );
}
