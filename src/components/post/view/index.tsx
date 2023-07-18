import { PostData } from "../../../common/types";
import ViewPostFooter, { ViewPostFooterProps } from "./ViewPostFooter";
import ViewPostHeader, { ViewPostHeaderProps } from "./ViewPostHeader";

export type ViewPostProps = {
  post: PostData;
  isBookmarked: boolean;
};

export default function ViewPost({ post, isBookmarked }: ViewPostProps) {
  const viewPostHeaderProps: ViewPostHeaderProps = {
    post: post,
    isBookmarkedInitially: isBookmarked,
  };
  const viewPostFooterProps: ViewPostFooterProps = {
    caption: post.caption,
  };

  return (
    <div className="view-post surface on-surface-text">
      <ViewPostHeader {...viewPostHeaderProps} />
      <img className="view-post-photo" src={post.photoUrl} />
      <ViewPostFooter {...viewPostFooterProps} />
    </div>
  );
}
