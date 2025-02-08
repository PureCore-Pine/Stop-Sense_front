import React, { useState } from 'react';
import '../styles/Upload.css';

const UploadPage: React.FC = () => {
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (videoSrc) {
        URL.revokeObjectURL(videoSrc);
      }
      const videoUrl = URL.createObjectURL(file);
      setVideoSrc(videoUrl);
    }
  };

  return (
    <div className="contend">
      <div className="upload-container">
        <h1 className="header">Upload</h1>
        <div className="upload-box">
          <h2 className="upload-title">Upload Clip</h2>

          {/* Video Preview Box */}
          <div className="video-preview">
            {videoSrc ? (
              <video className="file-upload" controls >
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <p className="preview-text">Upload Clip Preview</p>
            )}
          </div>

          {/* File Upload Button */}
          <input 
            type="file" 
            className="file-upload" 
            accept="video/*" 
            onChange={handleFileChange} 
          />
          <p className="upload-instructions">
            Click here to upload a clip from your computer
          </p>
        </div>

        {/* Result Clip */}
        <div className="result-outer">
          <div className="result-box">
            <video src="#" controls className="w-full h-full"></video>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;