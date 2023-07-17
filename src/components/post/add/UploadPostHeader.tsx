import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import {
  selectName,
  selectPhotoUrl,
  selectUsername,
  setName,
  setPhotoUrl,
  setUid,
  setUsername,
} from "../../../store/slices/userSlice";
import { getGoogleUserData } from "../../../services/authenticate";
import { getUserInfo, getUsername } from "../../../services/database";
import {
  BookmarkAddIcon,
  BookmarkIcon,
  SpinnerIcon,
} from "../../../common/icons";

export default function UploadPostHeader() {
  const userPhotoUrl = useAppSelector(selectPhotoUrl);
  const userUsername = useAppSelector(selectUsername);
  const userName = useAppSelector(selectName);
  const dispatch = useAppDispatch();
  const [isBookmark, setIsBookmark] = useState(false);

  const reloadUserState = async () => {
    const googleUserData = getGoogleUserData();
    const username = await getUsername(googleUserData.uid);
    const userInfo = await getUserInfo(username);
    dispatch(setUid(userInfo.uid));
    dispatch(setUsername(userInfo.username));
    dispatch(setName(userInfo.name));
    dispatch(setPhotoUrl(userInfo.photoUrl));
  };

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
    return isBookmark ? BookmarkIcon : BookmarkAddIcon;
  };

  useEffect(() => {
    if (userUsername.length === 0) {
      reloadUserState();
    }
  });

  return (
    <div className="upload-post-header">
      <div className={`upload-post-header-user-info ${getLoadingStyle()}`}>
        {showUserInfo()}
      </div>
      <div
        className="upload-post-header-bookmark"
        onClick={() => setIsBookmark(!isBookmark)}
      >
        {showBookmarkIcon()}
      </div>
    </div>
  );
}
