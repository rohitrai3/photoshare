import { useEffect, useState } from "react";
import ViewUserPosts, { ViewUserPostsProps } from "./ViewUserPosts";
import ViewUserHeader, { ViewUserHeaderProps } from "./ViewUserHeader";
import { PostData, UserInfo } from "../../../common/types";
import { getUserInfo, getUserPosts } from "../../../services/database";
import { SpinnerIcon } from "../../../common/icons";

export type ViewUserProps = {
  username: string;
};

export default function ViewUser({ username }: ViewUserProps) {
  const [user, setUser] = useState<UserInfo>();
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const viewUserHeaderProps: ViewUserHeaderProps = {
    username: user?.username!,
    name: user?.name!,
    photoUrl: user?.photoUrl!,
  };
  const [posts, setPosts] = useState<PostData[]>([]);
  const viewUserPostsProps: ViewUserPostsProps = {
    posts: posts,
  };

  const showUser = () => {
    if (isLoadingUser) {
      return SpinnerIcon;
    } else {
      return (
        <>
          <ViewUserHeader {...viewUserHeaderProps} />
          <ViewUserPosts {...viewUserPostsProps} />
        </>
      );
    }
  };

  const loadUser = async () => {
    setIsLoadingUser(true);
    const userInfo = await getUserInfo(username);
    setUser(userInfo);
    const fetchedPosts = await getUserPosts(username);
    setPosts(fetchedPosts);
    setIsLoadingUser(false);
  };

  useEffect(() => {
    loadUser();
  }, []);

  return <div className="view-user">{showUser()}</div>;
}
