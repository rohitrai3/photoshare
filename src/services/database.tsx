import { UserInfo } from "../common/types";
import app from "./firebase";
import { child, get, getDatabase, ref, set } from "firebase/database";

const database = getDatabase(app);

export const addUser = async (user: UserInfo) => {
  await set(ref(database, `users/${user.uid}`), {
    username: user.username,
  })
    .then(() => {
      console.log("User saved successfully: ", user.uid);
    })
    .catch((error) => {
      console.log("Error while saving user: ", error);
    });

  await set(ref(database, `users/${user.username}`), user)
    .then(() => {
      console.log("User data saved successfully: ", user.username);
    })
    .catch((error) => {
      console.log("Error while saving user info: ", error);
    });
};

export const getUsername = async (uid: string) => {
  var username = "";

  await get(child(ref(database), `users/${uid}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        username = snapshot.val().username;
      } else {
        console.log("User does not eixst: ", uid);
      }
    })
    .catch((error) => {
      console.log("Error while fetching user: ", error);
    });

  return username;
};

export const getUserInfo = async (username: string) => {
  var user: UserInfo = { uid: "", username: "", name: "", photoUrl: "" };

  await get(child(ref(database), `users/${username}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        user = snapshot.val();
      } else {
        console.log("User info does not exist: ", username);
      }
    })
    .catch((error) => {
      console.log("Error while fetching user info: ", error);
    });

  return user;
};

export const checkUidExist = async (uid: string) => {
  var isUidExist: boolean = false;

  await get(child(ref(database), `users/${uid}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        isUidExist = true;
      }
    })
    .catch((error) => {
      console.log("Error while checking uid: ", error);
    });

  return isUidExist;
};

export const checkUsernameExist = async (username: string) => {
  var isUsernameExist = false;

  await get(child(ref(database), `users/${username}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        isUsernameExist = true;
      }
    })
    .catch((error) => {
      console.log("Error while checking username: ", error);
    });

  return isUsernameExist;
};
