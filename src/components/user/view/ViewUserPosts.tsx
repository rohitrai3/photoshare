import { PostData } from "../../../common/types";

export type ViewUserPostsProps = {
  posts: PostData[];
};

export default function ViewUserPosts({ posts }: ViewUserPostsProps) {
  const showLeftPhotos = () => {
    return posts.map((post) => {
      if (posts.indexOf(post) % 2 == 0) {
        return <img key={post.uid} src={post.photoUrl} />;
      }
    });
  };

  const showRightPhotos = () => {
    return posts.map((post) => {
      if (posts.indexOf(post) % 2 == 1) {
        return <img key={post.uid} src={post.photoUrl} />;
      }
    });
  };

  return (
    <div className="user-posts">
      <div className="user-posts-photo">
        <div className="user-posts-photo-left">{showLeftPhotos()}</div>
        <div className="user-posts-photo-right">{showRightPhotos()}</div>
      </div>
    </div>
  );
}
