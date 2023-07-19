import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "./firebase";
import { GoogleUserData } from "../common/types";

const provider = new GoogleAuthProvider();
const auth = getAuth(app);

export const userSignIn = async () => {
  await signInWithPopup(auth, provider)
    .then((response) => {
      console.log("User sign is successful: ", response.user.uid);
    })
    .catch((error) => {
      console.log("Error while signing in user: ", error);
    });
};

export const checkUserSignedIn = (
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setIsUserSignedIn: React.Dispatch<React.SetStateAction<boolean>>
) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsUserSignedIn(true);
    } else {
      console.log("User is signed out");
      setIsUserSignedIn(false);
    }
    setIsLoading(false);
  });
};

export const getGoogleUserData = () => {
  const googleUserData: GoogleUserData = { uid: "", name: "", photoUrl: "" };
  const user = auth.currentUser;

  if (user) {
    googleUserData.uid = user.uid;
    googleUserData.name = user.displayName!;
    googleUserData.photoUrl = user.photoURL!;
  }

  return googleUserData;
};

export const userSignOut = async () => {
  await signOut(auth)
    .then(() => {
      console.log("Sign out successfull.");
    })
    .catch((error) => {
      console.log("Error while signing out: ", error);
    });
};
