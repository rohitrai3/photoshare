import { useAppSelector } from "../../../hooks/hooks";
import {
  selectName,
  selectPhotoUrl,
  selectUsername,
} from "../../../store/slices/userSlice";
import {
  BookmarkAddIcon,
  BookmarkIcon,
  SpinnerIcon,
} from "../../../common/icons";

export type UploadPostHeaderProps = {
  isBookmarked: boolean;
  setIsBookmarked: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function UploadPostHeader({
  isBookmarked,
  setIsBookmarked,
}: UploadPostHeaderProps) {
  const userPhotoUrl = useAppSelector(selectPhotoUrl);
  const userUsername = useAppSelector(selectUsername);
  const userName = useAppSelector(selectName);

  const getLoadingStyle = () => {
    if (userUsername.length === 0) {
      return "surface-dim";
    }
  };

  const showUserInfo = () => {
    if (userUsername.length === 0) {
      return SpinnerIcon;
    } else {
      return (
        <div className="user-info">
          <img src={userPhotoUrl} />
          <div className="user-info-name">
            <div className="user-name headline-small">{userName}</div>
            <div className="user-username label-medium">@{userUsername}</div>
          </div>
        </div>
      );
    }
  };

  const showBookmarkIcon = () => {
    return isBookmarked ? BookmarkIcon : BookmarkAddIcon;
  };

  return (
    <div className="post-header">
      <div className={`post-header-user-info ${getLoadingStyle()}`}>
        {showUserInfo()}
      </div>
      <div
        className="post-header-bookmark"
        onClick={() => setIsBookmarked(!isBookmarked)}
      >
        {showBookmarkIcon()}
      </div>
    </div>
  );
}
