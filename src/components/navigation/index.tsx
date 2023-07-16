import { useState } from "react";
import {
  AddCircleIcon,
  AddCircleOutlineIcon,
  HomeIcon,
  HomeOutlineIcon,
  PeopleIcon,
  PeopleOutlineIcon,
} from "../../common/icons";
import { useAppSelector } from "../../hooks/hooks";
import { selectPhotoUrl } from "../../store/slices/userSlice";
import { NavigationSection } from "../../common/enums";

export type NavigationProps = {
  isInitializingUserState: boolean;
};

export default function Navigation({
  isInitializingUserState,
}: NavigationProps) {
  const userPhotoUrl = useAppSelector(selectPhotoUrl);
  const [activeNavigation, setActiveNavigation] = useState(
    NavigationSection.HOME
  );

  const showUserProfilePhoto = () => {
    if (!isInitializingUserState) {
      return <img src={userPhotoUrl} />;
    }
  };

  const showHomeIcon = () => {
    if (activeNavigation === NavigationSection.HOME) {
      return HomeIcon;
    } else {
      return HomeOutlineIcon;
    }
  };

  const showAddPostIcon = () => {
    if (activeNavigation === NavigationSection.ADD_POST) {
      return AddCircleIcon;
    } else {
      return AddCircleOutlineIcon;
    }
  };

  const showContactsIcon = () => {
    if (activeNavigation === NavigationSection.CONTACTS) {
      return PeopleIcon;
    } else {
      return PeopleOutlineIcon;
    }
  };

  const getActiveNavigationStyle = (navigationSection: NavigationSection) => {
    if (navigationSection === activeNavigation) {
      return "secondary-container on-surface-container-text";
    }
  };

  return (
    <div className="navigation surface-container on-surface-variant-text label-medium">
      <div
        className="navigation-section"
        onClick={() => setActiveNavigation(NavigationSection.HOME)}
      >
        <div
          className={`navigation-icon ${getActiveNavigationStyle(
            NavigationSection.HOME
          )}`}
        >
          {showHomeIcon()}
        </div>
        Home
      </div>
      <div
        className="navigation-section"
        onClick={() => setActiveNavigation(NavigationSection.ADD_POST)}
      >
        <div
          className={`navigation-icon ${getActiveNavigationStyle(
            NavigationSection.ADD_POST
          )}`}
        >
          {showAddPostIcon()}
        </div>
        Add Post
      </div>
      <div
        className="navigation-section"
        onClick={() => setActiveNavigation(NavigationSection.CONTACTS)}
      >
        <div
          className={`navigation-icon ${getActiveNavigationStyle(
            NavigationSection.CONTACTS
          )}`}
        >
          {showContactsIcon()}
        </div>
        Contacts
      </div>
      <div
        className="navigation-section"
        onClick={() => setActiveNavigation(NavigationSection.USER)}
      >
        {showUserProfilePhoto()}
      </div>
    </div>
  );
}
