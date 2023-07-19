import { useEffect, useState } from "react";
import {
  getUserInfo,
  removeBookmark,
  saveBookmark,
} from "../../../services/database";
import {
  BookmarkAddIcon,
  BookmarkIcon,
  SpinnerIcon,
} from "../../../common/icons";
import { PostData, UserInfo } from "../../../common/types";
import { useAppSelector } from "../../../hooks/hooks";
import { selectUsername } from "../../../store/slices/userSlice";

export type ViewPostHeaderProps = {
  post: PostData;
  isBookmarkedInitially: boolean;
};

export default function ViewPostHeader({
  post,
  isBookmarkedInitially,
}: ViewPostHeaderProps) {
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [user, setUser] = useState<UserInfo>();
  const [isBookmarking, setIsBookmarking] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(isBookmarkedInitially);
  const userUsername = useAppSelector(selectUsername);

  const loadUser = async () => {
    setIsLoadingUser(true);
    const user = await getUserInfo(post.username);
    setUser(user);
    setIsLoadingUser(false);
  };

  const getLoadingStyle = () => {
    if (isLoadingUser) {
      return "surface-dim";
    }
  };

  const showUserInfo = () => {
    if (isLoadingUser) {
      return SpinnerIcon;
    } else {
      return (
        <div className="user-info">
          <img src={user?.photoUrl} />
          <div className="user-info-name">
            <div className="user-name headline-small">{user?.name}</div>
            <div className="user-username label-medium">@{user?.username}</div>
          </div>
        </div>
      );
    }
  };

  const showBookmarkIcon = () => {
    if (isBookmarking) {
      return SpinnerIcon;
    } else {
      return isBookmarked ? BookmarkIcon : BookmarkAddIcon;
    }
  };

  const updateBookmark = async () => {
    setIsBookmarking(true);
    if (isBookmarked) {
      await removeBookmark(userUsername, post);
    } else {
      await saveBookmark(userUsername, post);
    }
    setIsBookmarked(!isBookmarked);
    setIsBookmarking(false);
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <div className="post-header">
      <div className={`post-header-user-info ${getLoadingStyle()}`}>
        {showUserInfo()}
      </div>
      <div className="post-header-bookmark" onClick={() => updateBookmark()}>
        {showBookmarkIcon()}
      </div>
    </div>
  );
}
