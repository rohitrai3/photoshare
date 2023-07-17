export default function UploadPostFooter() {
  return (
    <div className="upload-post-footer">
      <div className="upload-post-caption label-large">
        <div className="upload-post-caption-label">Caption</div>
        <div className="upload-post-caption-input">
          <input
            className="surface on-surface-text body-medium"
            type="text"
            placeholder="Enter a caption..."
          />
        </div>
      </div>
      <button className="secondary on-secondary-text label-large">Post</button>
    </div>
  );
}
