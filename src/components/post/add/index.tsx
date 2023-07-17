import { NavigationSection } from "../../../common/enums";
import Navigation, { NavigationProps } from "../../navigation";
import UploadPostFooter from "./UploadPostFooter";
import UploadPostHeader from "./UploadPostHeader";
import UploadPostPhoto from "./UploadPostPhoto";

export default function AddPost() {
  const navigationProps: NavigationProps = {
    activeNavigationSection: NavigationSection.ADD_POST,
  };

  return (
    <div className="add-post background">
      <div className="content">
        <div className="upload-post surface on-surface-text">
          <UploadPostHeader />
          <UploadPostPhoto />
          <UploadPostFooter />
        </div>
      </div>
      <Navigation {...navigationProps} />
    </div>
  );
}
