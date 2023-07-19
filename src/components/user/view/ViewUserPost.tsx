import { PostData } from "../../../common/types";
import { ViewPost } from "../../post";
import { ViewPostProps } from "../../post/view";

export type ViewUserPostProps = {
  post: PostData;
};

export default function ViewUserPost({ post }: ViewUserPostProps) {
  const viewPostProps: ViewPostProps = {
    post: post,
    isBookmarked: false,
  };
  return (
    <div className="view-user-post">
      <ViewPost {...viewPostProps} />
    </div>
  );
}
