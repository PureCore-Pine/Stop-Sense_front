import React, { useState, useRef, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';


import '../styles/UploadPage.css'
import axios from 'axios';
import { API_IP } from '../assets/constant';


interface Point {
  x: number;
  y: number;
}

interface Polygon {
  points: Point[];
}

interface FormData {
  name: string;
  width: number;
  distance: number;
  description: string;
}

const UploadAndDraw: React.FC = () => {
  const navigate = useNavigate(); // Initialize navigation
  const user_id = localStorage.getItem('user_id');


  const [polygons, setPolygons] = useState<Polygon[]>([]);
  const [currentPoints, setCurrentPoints] = useState<Point[]>([]);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  // const [markingValues, setMarkingValues] = useState<string[]>(["x1,y1 (0,0)", "x2,y2 (0,0)", "x3,y3 (0,0)", "x4,y4 (0,0)"]);
  const [markingValues, setMarkingValues] = useState<number[][]>([[0, 0], [0, 0], [0, 0], [0, 0]]);

  const [videoDimensions, setVideoDimensions] = useState<{ width: number, height: number }>({ width: 0, height: 0 });

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const uploadInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      video.addEventListener('loadedmetadata', () => {
        if (canvasRef.current) {
          const canvas = canvasRef.current;
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          setVideoDimensions({ width: video.videoWidth, height: video.videoHeight });
        }
      });
    }
  }, [videoUrl]);

  const triggerUpload = () => {
    if (uploadInputRef.current) {
      uploadInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // Release previous object URL if exists
      if (videoUrl) {
        URL.revokeObjectURL(videoUrl);
      }

      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setVideoUrl(url);

      // Reset drawing state when uploading a new video
      setCurrentPoints([]);
      setPolygons([]);
      // setMarkingValues(["x1,y1 (0,0)", "x2,y2 (0,0)", "x3,y3 (0,0)", "x4,y4 (0,0)"]);
      setMarkingValues([]);

      // Clear the file input value to allow re-uploading the same file
      e.target.value = '';
    }
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const rect = canvas?.getBoundingClientRect();

    if (!rect || !canvas) return;

    // Calculate click position relative to canvas size
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const clickX = (e.clientX - rect.left) * scaleX;
    const clickY = (e.clientY - rect.top) * scaleY;

    // Check if click is within video boundaries
    if (clickX >= 0 && clickX <= canvas.width &&
      clickY >= 0 && clickY <= canvas.height) {

      const newPoints = [...currentPoints, { x: clickX, y: clickY }];
      setCurrentPoints(newPoints);
      updateInputFields(newPoints);

      if (newPoints.length === 4) {
        setPolygons(prev => [...prev, { points: newPoints }]);
        setCurrentPoints([]); // Start a new polygon
      }
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (canvas && ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = 'red';
      ctx.lineWidth = 2;

      // Draw completed polygons
      polygons.forEach(({ points }) => {
        ctx.beginPath();
        points.forEach((point, index) => {
          if (index === 0) {
            ctx.moveTo(point.x, point.y);
          } else {
            ctx.lineTo(point.x, point.y);
          }
        });
        ctx.closePath();
        ctx.stroke();
      });

      // Draw lines of the polygon being created
      if (currentPoints.length > 0) {
        ctx.beginPath();
        currentPoints.forEach((point, index) => {
          if (index === 0) {
            ctx.moveTo(point.x, point.y);
          } else {
            ctx.lineTo(point.x, point.y);
          }
        });
        ctx.stroke();
      }
    }
  }, [polygons, currentPoints]);

  // Update input fields with the coordinates of the clicked points
  const updateInputFields = (points: Point[]) => {
    const newMarkingValues = points.map((point) => [Math.round(point.x), Math.round(point.y)]);

    while (newMarkingValues.length < 4) {
      newMarkingValues.push([0, 0]); // Ensure it always has 4 values
    }

    setMarkingValues(newMarkingValues);
  };

  const handleClearDrawing = () => {
    // Clear both completed polygons and current points being drawn
    setPolygons([]);
    setCurrentPoints([]);
    setMarkingValues(["x1,y1 (0,0)", "x2,y2 (0,0)", "x3,y3 (0,0)", "x4,y4 (0,0)"]);

    // Clear the canvas
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const resetUpload = () => {
    // Release the object URL to avoid memory leaks
    if (videoUrl) {
      URL.revokeObjectURL(videoUrl);
    }

    setVideoUrl(null);
    setCurrentPoints([]);
    setPolygons([]);
    // setMarkingValues(["x1,y1 (0,0)", "x2,y2 (0,0)", "x3,y3 (0,0)", "x4,y4 (0,0)"]);
    setMarkingValues([]);

    setVideoDimensions({ width: 0, height: 0 });
  };

  const [formData, setFormData] = useState<FormData>({
    name: '',
    width: 0,
    distance: 0,
    description: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      user_id: user_id,
      name: formData.name,
      width: formData.width,
      distance: formData.distance,
      point: [
        markingValues[0], markingValues[1],
        markingValues[2], markingValues[3]
      ],
      descripton: formData.description
    }
    // console.log({ data })
    await axios.post(API_IP + '/uploadClip', data)
      .then(res => {
        console.log({ res })
        alert(res?.data.message || 'Uploaded')
      })
      .catch(err => {
        console.warn({err})
        alert(err.response?.data.message)
      })
  }

  return (
    <div>
      {/* Hidden file input that both initial upload and "Upload Again" will use */}
      <input
        type="file"
        ref={uploadInputRef}
        accept="video/*"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

      {!videoUrl && (
        <div className="container" id="uploadContainer">
          <div className="header">
            <h1>Upload</h1>
          </div>
          <div className="upload-box" id="uploadBox">
            <p>Drag&Drop video files here</p>
            <button className="browse-button" onClick={triggerUpload}>
              Browse Files
            </button>
          </div>
        </div>
      )}

      {videoUrl && (
        <div className="container">
          <h1>Draw Polygons on Video</h1>
          <div className="upload-buttons">
            <button className="cancel" onClick={resetUpload}>Cancel</button>
            <button className="upload-again" onClick={triggerUpload}>Upload Again</button>
          </div>

          <div style={{ position: 'relative', marginTop: '10px' }}>
            <video
              ref={videoRef}
              src={videoUrl}
              width="100%"
              height="auto"
              controls
              autoPlay
            />
            <canvas
              ref={canvasRef}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'auto'
              }}
              onClick={handleCanvasClick}
            />
          </div>

          <div className="upload-buttons">
            <button className="calculate" onClick={handleCalculate}>Calculate</button>
            <button className="clear" onClick={handleClearDrawing}>Clear Drawing</button>
          </div>

          <div className="form">
            <div className="input-fields">
              <input type="text" id="clipName" placeholder="Name" value={formData.name} name='name' onChange={handleChange} required />

              <input type="text" id="marking" placeholder="marking (x1,y1)" value={markingValues[0]} readOnly />
              <input type="text" id="marking2" placeholder="marking (x2,y2)" value={markingValues[1]} readOnly />
              <input type="text" id="marking3" placeholder="marking (x3,y3)" value={markingValues[2]} readOnly />
              <input type="text" id="marking4" placeholder="marking (x4,y4)" value={markingValues[3]} readOnly />

              <input type="text" id="width" placeholder="width" value={formData.width} name='width' onChange={handleChange} required />
              <input type="text" id="distance" placeholder="distance" value={formData.distance} name='distance' onChange={handleChange} required />
            </div>

            <textarea
              id="description"
              placeholder="description"
              value={formData.description}
              name="description"
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}>
            </textarea>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadAndDraw;
