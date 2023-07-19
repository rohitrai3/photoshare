import {
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
} from "firebase/storage";
import app from "./firebase";

const storage = getStorage(app);

export const savePhoto = async (uid: string, photo: string) => {
  const photoRef = ref(storage, `images/${uid}`);
  var downloadUrl = "";

  await uploadString(photoRef, photo, "data_url")
    .then(() => {
      console.log("Photo saved successfully.");
    })
    .catch((error) => {
      console.log("Error while saving photo: ", error);
    });

  await getDownloadURL(photoRef)
    .then((url) => {
      downloadUrl = url;
    })
    .catch((error) => {
      console.log("Error while fetching download url: ", error);
    });

  return downloadUrl;
};
