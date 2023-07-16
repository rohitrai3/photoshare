import { useEffect } from "react";
import { getGoogleUserData, userSignOut } from "../../services/authenticate";
import { ErrorMessage, UserType } from "../../common/enums";
import {
  addUser,
  checkUidExist,
  checkUsernameExist,
  getUserInfo,
} from "../../services/database";
import { UserInfo } from "../../common/types";
import { useAppDispatch } from "../../hooks/hooks";
import {
  setName,
  setPhotoUrl,
  setUid,
  setUsername,
} from "../../store/slices/userSlice";

export default function Home() {
  const dispatch = useAppDispatch();

  const setErrorMessage = (errorMessage: ErrorMessage) => {
    sessionStorage.setItem("error", errorMessage);
    userSignOut();
  };

  const setUserState = async (username: string) => {
    const user = await getUserInfo(username);
    dispatch(setUid(user.uid));
    dispatch(setUsername(user.username));
    dispatch(setName(user.name));
    dispatch(setPhotoUrl(user.photoUrl));
    sessionStorage.clear();
  };

  const initializeUserState = async () => {
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
            await addUser(newUser);
            await setUserState(username);
          }
        }
      } else {
        if (isUidExist) {
          await setUserState(username);
        } else {
          setErrorMessage(ErrorMessage.USER_NOT_EXIST);
        }
      }
    } else {
      await setUserState(username);
    }
  };

  useEffect(() => {
    initializeUserState();
  }, []);

  return <div>Home</div>;
}
