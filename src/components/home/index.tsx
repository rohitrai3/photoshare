import { useEffect, useState } from "react";
import { getGoogleUserData, userSignOut } from "../../services/authenticate";
import { ErrorMessage, NavigationSection, UserType } from "../../common/enums";
import {
  saveUser,
  checkUidExist,
  checkUsernameExist,
  getUserInfo,
  getUsername,
} from "../../services/database";
import { UserInfo } from "../../common/types";
import { useAppDispatch } from "../../hooks/hooks";
import {
  setName,
  setPhotoUrl,
  setUid,
  setUsername,
} from "../../store/slices/userSlice";
import Navigation, { NavigationProps } from "../navigation";
import HomeViewPosts, { HomeViewPostsProps } from "./HomeViewPosts";
import { SpinnerIcon } from "../../common/icons";

export default function Home() {
  const dispatch = useAppDispatch();
  const [isInitializingUserState, setIsInitializingUserState] = useState(true);
  const navigationProps: NavigationProps = {
    isInitializingUserState: isInitializingUserState,
    activeNavigationSection: NavigationSection.HOME,
  };
  const homeViewPostsProps: HomeViewPostsProps = {
    isInitializingUserState: isInitializingUserState,
  };

  const setErrorMessage = (errorMessage: ErrorMessage) => {
    sessionStorage.setItem("error", errorMessage);
    userSignOut();
  };

  const setUserState = async (uid: string) => {
    const username = await getUsername(uid);
    const user = await getUserInfo(username);
    dispatch(setUid(user.uid));
    dispatch(setUsername(user.username));
    dispatch(setName(user.name));
    dispatch(setPhotoUrl(user.photoUrl));
    sessionStorage.clear();
  };

  const initializeUserState = async () => {
    setIsInitializingUserState(true);
    const googleUserData = getGoogleUserData();
    const userType = sessionStorage.getItem("userType");
    const username = sessionStorage.getItem("username")!;
    if (userType) {
      const isUidExist = await checkUidExist(googleUserData.uid);

      if (userType === UserType.NEW) {
        if (isUidExist) {
          setErrorMessage(ErrorMessage.USER_EXIST);
        } else {
          const isUsernameExist = await checkUsernameExist(username);

          if (isUsernameExist) {
            setErrorMessage(ErrorMessage.USERNAME_TAKEN);
          } else {
            const newUser: UserInfo = {
              uid: googleUserData.uid,
              username: username,
              name: googleUserData.name,
              photoUrl: googleUserData.photoUrl,
            };
            await saveUser(newUser);
            await setUserState(googleUserData.uid);
          }
        }
      } else {
        if (isUidExist) {
          await setUserState(googleUserData.uid);
        } else {
          setErrorMessage(ErrorMessage.USER_NOT_EXIST);
        }
      }
    } else {
      await setUserState(googleUserData.uid);
    }
    setIsInitializingUserState(false);
  };

  const showHome = () => {
    if (isInitializingUserState) {
      return SpinnerIcon;
    } else {
      return (
        <div className="home background">
          <div className="content">
            <HomeViewPosts {...homeViewPostsProps} />
          </div>
          <Navigation {...navigationProps} />
        </div>
      );
    }
  };

  useEffect(() => {
    initializeUserState();
  }, []);

  return showHome();
}
