import { PostData, UserInfo } from "../common/types";
import app from "./firebase";
import { child, get, getDatabase, ref, set } from "firebase/database";

const database = getDatabase(app);

export const saveUser = async (user: UserInfo) => {
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

export const savePost = async (username: string, post: PostData) => {
  const posts = [post];

  await get(child(ref(database), `posts/${username}/create`)).then(
    async (snapshot) => {
      if (snapshot.exists()) {
        const fetchedPosts: PostData[] = snapshot.val();
        fetchedPosts.forEach((post) => {
          posts.push(post);
        });
      } else {
        console.log("Post does not exit: ", username);
      }

      await set(ref(database, `posts/${username}/create`), posts)
        .then(() => {
          console.log("Post saved successfully.");
        })
        .catch((error) => {
          console.log("Error while saving post: ", error);
        });
    }
  );
};

export const saveBookmark = async (username: string, post: PostData) => {
  const posts = [post];

  await get(child(ref(database), `posts/${username}/bookmark`)).then(
    async (snapshot) => {
      if (snapshot.exists()) {
        const fetchedPosts: PostData[] = snapshot.val();
        fetchedPosts.forEach((post) => {
          posts.push(post);
        });
      } else {
        console.log("Post does not exit: ", username);
      }

      await set(ref(database, `posts/${username}/bookmark`), posts)
        .then(() => {
          console.log("Post saved successfully.");
        })
        .catch((error) => {
          console.log("Error while saving post: ", error);
        });
    }
  );
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

export const getUserPosts = async (username: string) => {
  var posts: PostData[] = [];

  await get(child(ref(database), `posts/${username}/create`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        posts = snapshot.val();
      }
    })
    .catch((error) => {
      console.log("Error while fetching posts: ", error);
    });

  return posts;
};

export const getUserBookmarks = async (username: string) => {
  var bookmarks: PostData[] = [];

  await get(child(ref(database), `posts/${username}/bookmark`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        bookmarks = snapshot.val();
      }
    })
    .catch((error) => {
      console.log("Error while fetching bookmarks: ", error);
    });

  return bookmarks;
};

export const removeBookmark = async (username: string, post: PostData) => {
  var bookmarks: PostData[] = [];

  await get(child(ref(database), `posts/${username}/bookmark`)).then(
    async (snapshot) => {
      if (snapshot.exists()) {
        const fetchedBookmarks: PostData[] = snapshot.val();
        bookmarks = fetchedBookmarks.filter(
          (bookmark) => bookmark.uid !== post.uid
        );
      } else {
        console.log("Bookmark does not exit: ", username);
      }

      await set(ref(database, `posts/${username}/bookmark`), bookmarks)
        .then(() => {
          console.log("Bookmark removed successfully.");
        })
        .catch((error) => {
          console.log("Error while removing bookmark: ", error);
        });
    }
  );
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
