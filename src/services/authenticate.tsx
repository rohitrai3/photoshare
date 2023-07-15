import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
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
