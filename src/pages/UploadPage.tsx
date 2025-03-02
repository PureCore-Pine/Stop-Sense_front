import React, { useRef } from "react";
import VideoPolygonDrawer from "../controler/VideoPolygonDrawer"; 
import '../styles/UploadPage.css';

const UploadPage: React.FC = () => {
  const uploadInputRef = useRef<HTMLInputElement>(null);

  const triggerUpload = () => {
    if (uploadInputRef.current) {
      uploadInputRef.current.click();
    }
  };

  return (
    <>
      {/* Upload Section */}
      <div className="container">
        <div className="header">
          <h1>Upload</h1>
        </div>
        <div className="upload-box">
          <input
            type="file"
            accept="video/*"
            style={{ display: "none" }}
            ref={uploadInputRef}
          />
          <p>Drag & Drop video files here</p>
          <button className="browse-button" onClick={triggerUpload}>
            Browse Files
          </button>
        </div>
      </div>

      {/* Video Polygon Drawer Component */}
      <VideoPolygonDrawer />
    </>
  );
};

export default UploadPage;
