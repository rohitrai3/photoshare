import { useState } from "react";
import { NavigationSection } from "../../../common/enums";
import Navigation, { NavigationProps } from "../../navigation";
import UploadPostFooter, { UploadPostFooterProps } from "./UploadPostFooter";
import UploadPostHeader, { UploadPostHeaderProps } from "./UploadPostHeader";
import UploadPostPhoto, { UploadPostPhotoProps } from "./UploadPostPhoto";

export default function AddPost() {
  const navigationProps: NavigationProps = {
    activeNavigationSection: NavigationSection.ADD_POST,
  };
  const [selectedPhoto, setSelectedPhoto] = useState("");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const uploadPostHeaderProps: UploadPostHeaderProps = {
    isBookmarked: isBookmarked,
    setIsBookmarked: setIsBookmarked,
  };
  const uploadPostPhotoProps: UploadPostPhotoProps = {
    selectedPhoto: selectedPhoto,
    setSelectedPhoto: setSelectedPhoto,
  };
  const uploadPostFooterProps: UploadPostFooterProps = {
    selectedPhoto: selectedPhoto,
    isBookmarked: isBookmarked,
  };

  return (
    <div className="add-post background">
      <div className="content">
        <div className="upload-post surface on-surface-text">
          <UploadPostHeader {...uploadPostHeaderProps} />
          <UploadPostPhoto {...uploadPostPhotoProps} />
          <UploadPostFooter {...uploadPostFooterProps} />
        </div>
      </div>
      <Navigation {...navigationProps} />
    </div>
  );
}
