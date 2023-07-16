import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import app from "./firebase";

const provider = new GoogleAuthProvider();
const auth = getAuth(app);

export const signIn = async () => {
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
