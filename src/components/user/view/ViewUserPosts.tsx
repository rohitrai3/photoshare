import { useState } from "react";
import { PostData } from "../../../common/types";
import ViewUserPost, { ViewUserPostProps } from "./ViewUserPost";
import { CloseIcon } from "../../../common/icons";

export type ViewUserPostsProps = {
  posts: PostData[];
};

export default function ViewUserPosts({ posts }: ViewUserPostsProps) {
  const [viewUserPostProps, setViewUserPostProps] =
    useState<ViewUserPostProps | null>(null);

  const showUserPost = () => {
    if (viewUserPostProps) {
      return (
        <div className="user-post-dialog">
          <div className="dialog-background shadow" />
          <div className="dialog-container">
            <div
              className="user-post-close-button primary-container"
              onClick={() => setViewUserPostProps(null)}
            >
              {CloseIcon}
            </div>
            <ViewUserPost {...viewUserPostProps} />
          </div>
        </div>
      );
    }
  };

  const showLeftPhotos = () => {
    return posts.map((post) => {
      if (posts.indexOf(post) % 2 == 0) {
        return (
          <img
            key={post.uid}
            src={post.photoUrl}
            onClick={() => setViewUserPostProps({ post: post })}
          />
        );
      }
    });
  };

  const showRightPhotos = () => {
    return posts.map((post) => {
      if (posts.indexOf(post) % 2 == 1) {
        return (
          <img
            key={post.uid}
            src={post.photoUrl}
            onClick={() => setViewUserPostProps({ post: post })}
          />
        );
      }
    });
  };

  return (
    <div className="user-posts">
      <div className="user-posts-photo">
        <div className="user-posts-photo-left">{showLeftPhotos()}</div>
        <div className="user-posts-photo-right">{showRightPhotos()}</div>
      </div>
      {showUserPost()}
    </div>
  );
}
