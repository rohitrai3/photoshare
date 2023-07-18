import {
  AddCircleIcon,
  AddCircleOutlineIcon,
  HomeIcon,
  HomeOutlineIcon,
  PeopleIcon,
  PeopleOutlineIcon,
  SpinnerIcon,
} from "../../common/icons";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  selectPhotoUrl,
  setName,
  setPhotoUrl,
  setUid,
  setUsername,
} from "../../store/slices/userSlice";
import { NavigationSection } from "../../common/enums";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getGoogleUserData } from "../../services/authenticate";
import { getUserInfo, getUsername } from "../../services/database";

export type NavigationProps = {
  isInitializingUserState?: boolean;
  activeNavigationSection: NavigationSection;
};

export default function Navigation({
  isInitializingUserState,
  activeNavigationSection,
}: NavigationProps) {
  const userPhotoUrl = useAppSelector(selectPhotoUrl);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isReloadingUserState, setIsReloadingUserState] = useState(false);

  const showUserProfilePhoto = () => {
    if (isInitializingUserState || isReloadingUserState) {
      return SpinnerIcon;
    } else {
      return <img src={userPhotoUrl} />;
    }
  };

  const showHomeIcon = () => {
    if (activeNavigationSection === NavigationSection.HOME) {
      return HomeIcon;
    } else {
      return HomeOutlineIcon;
    }
  };

  const showAddPostIcon = () => {
    if (activeNavigationSection === NavigationSection.ADD_POST) {
      return AddCircleIcon;
    } else {
      return AddCircleOutlineIcon;
    }
  };

  const showContactsIcon = () => {
    if (activeNavigationSection === NavigationSection.CONTACTS) {
      return PeopleIcon;
    } else {
      return PeopleOutlineIcon;
    }
  };

  const getActiveNavigationStyle = (navigationSection: NavigationSection) => {
    if (navigationSection === activeNavigationSection) {
      return "secondary-container on-surface-container-text";
    }
  };

  const reloadUserState = async () => {
    setIsReloadingUserState(true);
    const googleUserData = getGoogleUserData();
    const username = await getUsername(googleUserData.uid);
    const userInfo = await getUserInfo(username);
    dispatch(setUid(userInfo.uid));
    dispatch(setUsername(userInfo.username));
    dispatch(setName(userInfo.name));
    dispatch(setPhotoUrl(userInfo.photoUrl));
    setIsReloadingUserState(false);
  };

  useEffect(() => {
    if (userPhotoUrl.length === 0) {
      reloadUserState();
    }
  }, []);

  return (
    <div className="navigation surface-container on-surface-variant-text label-medium">
      <div className="navigation-section" onClick={() => navigate("/")}>
        <div
          className={`navigation-icon ${getActiveNavigationStyle(
            NavigationSection.HOME
          )}`}
        >
          {showHomeIcon()}
        </div>
        Home
      </div>
      <div className="navigation-section" onClick={() => navigate("/add_post")}>
        <div
          className={`navigation-icon ${getActiveNavigationStyle(
            NavigationSection.ADD_POST
          )}`}
        >
          {showAddPostIcon()}
        </div>
        Add Post
      </div>
      <div className="navigation-section" onClick={() => navigate("/contacts")}>
        <div
          className={`navigation-icon ${getActiveNavigationStyle(
            NavigationSection.CONTACTS
          )}`}
        >
          {showContactsIcon()}
        </div>
        Contacts
      </div>
      <div className="navigation-section" onClick={() => navigate("/user")}>
        {showUserProfilePhoto()}
      </div>
    </div>
  );
}
