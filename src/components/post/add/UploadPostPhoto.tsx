import { useRef } from "react";
import { AddPhotoIcon } from "../../../common/icons";

export type UploadPostPhotoProps = {
  selectedPhoto: string;
  setSelectedPhoto: React.Dispatch<React.SetStateAction<string>>;
};

export default function UploadPostPhoto({
  selectedPhoto,
  setSelectedPhoto,
}: UploadPostPhotoProps) {
  const photoInputRef = useRef(null);

  const updatePhotoPath = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles: FileList = event.target.files as FileList;
    if (selectedFiles?.length > 0) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(selectedFiles[0]);
      fileReader.onload = (event) => {
        setSelectedPhoto(event.target?.result as string);
      };
    }
  };

  const clickOnPhotoInput = () => {
    if (photoInputRef.current !== null) {
      (photoInputRef.current as HTMLInputElement).click();
    }
  };

  const showPhotoInput = () => {
    if (selectedPhoto) {
      return (
        <div className="upload-photo-preview">
          <img src={selectedPhoto} onClick={() => clickOnPhotoInput()} />
        </div>
      );
    } else {
      return (
        <div className="upload-photo-button">
          <div
            className="upload-photo-icon primary"
            onClick={() => clickOnPhotoInput()}
          >
            {AddPhotoIcon}
          </div>
          <div
            className="upload-photo-label"
            onClick={() => clickOnPhotoInput()}
          >
            Upload a photo
          </div>
        </div>
      );
    }
  };

  return (
    <div className="upload-post-photo surface-variant on-surface-variant-text title-large">
      <input
        type="file"
        accept="image/*"
        hidden
        onChange={updatePhotoPath}
        ref={photoInputRef}
      />
      {showPhotoInput()}
    </div>
  );
}
