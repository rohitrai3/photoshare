import { useEffect, useState } from "react";
import {
  getConnectedUsers,
  getUserBookmarks,
  getUserPosts,
} from "../../services/database";
import { useAppSelector } from "../../hooks/hooks";
import { selectUsername } from "../../store/slices/userSlice";
import { PostData } from "../../common/types";
import { SpinnerIcon } from "../../common/icons";
import { ViewPost } from "../post";
import { ViewPostProps } from "../post/view";

export type HomeViewPostsProps = {
  isInitializingUserState: boolean;
};

export default function HomeViewPosts({
  isInitializingUserState,
}: HomeViewPostsProps) {
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const userUsername = useAppSelector(selectUsername);
  const [posts, setPosts] = useState<PostData[]>([]);
  const [bookmarks, setBookmarks] = useState<PostData[]>([]);

  const showPosts = () => {
    if (isLoadingPosts) {
      return SpinnerIcon;
    } else {
      return (
        <>
          {posts.map((post) => {
            const isBookmarked = bookmarks.filter(
              (bookmark) => bookmark.uid === post.uid
            );
            const viewPostProps: ViewPostProps = {
              post: post,
              isBookmarked: isBookmarked.length !== 0,
            };

            return <ViewPost key={post.uid} {...viewPostProps} />;
          })}
        </>
      );
    }
  };

  const loadPosts = async () => {
    setIsLoadingPosts(true);
    const contacts = await getConnectedUsers(userUsername);
    var allPosts = await getUserPosts(userUsername);
    for (const username of contacts) {
      const fetchedPosts = await getUserPosts(username);
      allPosts = [...allPosts, ...fetchedPosts];
    }
    allPosts.sort((postA, postB) =>
      postA.timestamp > postB.timestamp ? -1 : 1
    );
    setPosts(allPosts);
    const fetchedBookmarks = await getUserBookmarks(userUsername);
    setBookmarks(fetchedBookmarks);
    setIsLoadingPosts(false);
  };

  useEffect(() => {
    if (!isInitializingUserState) {
      loadPosts();
    }
  }, [isInitializingUserState]);

  return <div className="home-view-posts">{showPosts()}</div>;
}
