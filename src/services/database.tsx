import {
  CommentData,
  CommentDataWithUserInfo,
  PostData,
  UserInfo,
} from "../common/types";
import app from "./firebase";
import { child, get, getDatabase, onValue, ref, set } from "firebase/database";

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

export const saveConnectionRequest = async (
  username: string,
  contact: string
) => {
  const requests = [username];
  var isRequestExist = false;

  await get(child(ref(database), `requests/${contact}`))
    .then(async (snapshot) => {
      if (snapshot.exists()) {
        const fetchedRequests: string[] = snapshot.val();
        isRequestExist = fetchedRequests.includes(username);
        fetchedRequests.forEach((request) => {
          requests.push(request);
        });
      } else {
        console.log("Connection request does not exist: ", username, contact);
      }

      if (!isRequestExist) {
        await set(ref(database, `requests/${contact}`), requests)
          .then(() => {
            console.log("Connection request saved successfully.");
          })
          .catch((error) => {
            console.log("Error while saving connection request: ", error);
          });
      }
    })
    .catch((error) => {
      console.log("Error while fetching connection requests: ", error);
    });
};

export const saveContact = async (username: string, contact: string) => {
  await get(child(ref(database), `contacts/${username}`))
    .then(async (snapshot) => {
      if (snapshot.exists()) {
        const fetchedContacts = snapshot.val();
        fetchedContacts.push(contact);

        await set(ref(database, `contacts/${username}`), fetchedContacts)
          .then(() => {
            console.log("Contact saved successfully: ", username, contact);
          })
          .catch((error) => {
            console.log("Error while saving contact: ", error);
          });
      } else {
        await set(ref(database, `contacts/${username}`), [contact])
          .then(() => {
            console.log("Contact saved successfully: ", username, contact);
          })
          .catch((error) => {
            console.log("Error while saving contact: ", error);
          });
      }
    })
    .catch((error) => {
      console.log("Error while fetching contact: ", error);
    });
};

export const saveComment = async (comment: CommentData, postUid: string) => {
  const comments = [comment];

  await get(child(ref(database), `comments/${postUid}`))
    .then(async (snapshot) => {
      if (snapshot.exists()) {
        const fetchedComments: CommentData[] = snapshot.val();
        fetchedComments.forEach((comment) => {
          comments.push(comment);
        });
      } else {
        console.log("Comments does not exist.");
      }

      await set(ref(database, `comments/${postUid}`), comments)
        .then(() => {
          console.log("Comments saved successfully.");
        })
        .catch((error) => {
          console.log("Error while saving comments", error);
        });
    })
    .catch((error) => {
      console.log("Error while fetching comments: ", error);
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

export const getConnectedUsers = async (username: string) => {
  var connectedUsers: string[] = [];

  await get(child(ref(database), `contacts/${username}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        connectedUsers = snapshot.val();
      }
    })
    .catch((error) => {
      console.log("Error while fetching contacts: ", error);
    });

  return connectedUsers;
};

export const getCommentWithUser = async (postUid: string) => {
  const commentsWithUser: CommentDataWithUserInfo[] = [];

  await get(child(ref(database), `comments/${postUid}`))
    .then(async (snapshot) => {
      if (snapshot.exists()) {
        const comments: CommentData[] = snapshot.val();
        for (const comment of comments) {
          const user = await getUserInfo(comment.username);
          commentsWithUser.push({ comment: comment, user: user });
        }
      } else {
        console.log("Comments does not exist.");
      }
    })
    .catch((error) => {
      console.log("Error while fetching comments: ", error);
    });

  return commentsWithUser;
};

export const getConnectedUsersOnUpdate = (
  username: string,
  setConnectedUsers: React.Dispatch<React.SetStateAction<UserInfo[]>>
) => {
  const users: UserInfo[] = [];

  onValue(ref(database, `contacts/${username}`), async (snapshot) => {
    if (snapshot.exists()) {
      const usernames: string[] = snapshot.val();
      for (const username of usernames) {
        const user = await getUserInfo(username);
        users.push(user);
      }
    } else {
      console.log("Contacts does not exist: ", username);
    }
    setConnectedUsers(users);
  });
};

export const getConnectionRequestsOnUpdate = (
  username: string,
  setConnectionRequests: React.Dispatch<React.SetStateAction<UserInfo[]>>
) => {
  const users: UserInfo[] = [];

  onValue(ref(database, `requests/${username}`), async (snapshot) => {
    if (snapshot.exists()) {
      const usernames = snapshot.val();
      for (const username of usernames) {
        const user = await getUserInfo(username);
        users.push(user);
      }
    } else {
      console.log("Connection requests does not exist: ", username);
    }
    setConnectionRequests(users);
  });
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

export const removeConnectionRequest = async (
  username: string,
  contact: string
) => {
  await get(child(ref(database), `requests/${username}`))
    .then(async (snapshot) => {
      if (snapshot.exists()) {
        const fetchedRequests = snapshot.val();
        fetchedRequests.splice(fetchedRequests.indexOf(contact), 1);

        await set(ref(database, `requests/${username}`), fetchedRequests)
          .then(() => {
            console.log(
              "Connection request removed successfully: ",
              contact,
              username
            );
          })
          .catch((error) => {
            console.log("Error while removing connection request: ", error);
          });
      }
    })
    .catch((error) => {
      console.log("Error while fetching connection requests: ", error);
    });
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
