import React, { useState, useRef, useEffect } from 'react';

interface Point {
  x: number;
  y: number;
}

const VideoPolygonDrawer: React.FC = () => {
  const [points, setPoints] = useState<Point[]>([]);
  const [scaleX, setScaleX] = useState<number>(1);
  const [scaleY, setScaleY] = useState<number>(1);
  const [drawingActive, setDrawingActive] = useState<boolean>(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const uploadInputRef = useRef<HTMLInputElement>(null);
  const [showUpload, setShowUpload] = useState<boolean>(true);
  const [showDrawing, setShowDrawing] = useState<boolean>(false);

  const triggerUpload = () => {
    uploadInputRef.current?.click();
  };

  const resetUpload = () => {
    setShowUpload(true);
    setShowDrawing(false);
    setVideoUrl(null);
    setPoints([]);
    if (uploadInputRef.current) {
      uploadInputRef.current.value = '';
      setTimeout(() => uploadInputRef.current?.click(), 100);
    }
  };

  const cancelUpload = () => {
    setShowUpload(true);
    setShowDrawing(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleFile = (file: File) => {
    const url = URL.createObjectURL(file);
    setVideoUrl(url);
    setShowUpload(false);
    setShowDrawing(true);
  };

  useEffect(() => {
    if (videoUrl && videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      video.src = videoUrl;
      video.load();
      video.controls = true;
      video.loop = true;

      const handleCanPlay = () => {
        if (ctx) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          setScaleX(canvas.width / video.videoWidth);
          setScaleY(canvas.height / video.videoHeight);
          video.play();
          if (!drawingActive) {
            setDrawingActive(true);
            startDrawing(ctx, video);
          }
        }
      };

      video.addEventListener('canplay', handleCanPlay);
      return () => video.removeEventListener('canplay', handleCanPlay);
    }
  }, [videoUrl, drawingActive]);

  const startDrawing = (ctx: CanvasRenderingContext2D, video: HTMLVideoElement) => {
    const renderFrame = () => {
      ctx.drawImage(video, 0, 0, canvasRef.current!.width, canvasRef.current!.height);
      drawPolygon(ctx, points);
      if (typeof video.requestVideoFrameCallback === 'function') {
        video.requestVideoFrameCallback(renderFrame);
      } else {
        setTimeout(renderFrame, 33);
      }
    };

    if (typeof video.requestVideoFrameCallback === 'function') {
      video.requestVideoFrameCallback(renderFrame);
    } else {
      setTimeout(renderFrame, 33);
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) * (canvasRef.current.width / rect.width);
      const y = (e.clientY - rect.top) * (canvasRef.current.height / rect.height);
      const newPoints = [...points, { x, y }];
      setPoints(newPoints);
      updateInputFields(newPoints);
    }
  };

  const handleDoubleClick = () => {
    if (points.length > 2) setPoints([...points, points[0]]);
  };

  const drawPolygon = (ctx: CanvasRenderingContext2D, points: Point[]) => {
    if (points.length === 0) return;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    points.forEach(point => ctx.lineTo(point.x, point.y));
    ctx.closePath();
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  const updateInputFields = (updatedPoints: Point[]) => {
    const fieldIds = ['marking', 'marking2', 'marking3', 'marking4'];
    fieldIds.forEach((id, index) => {
      const field = document.getElementById(id) as HTMLInputElement | null;
      if (field) {
        field.value = updatedPoints.length > index
          ? `x${index + 1},y${index + 1} (${Math.round(updatedPoints[index].x)}, ${Math.round(updatedPoints[index].y)})`
          : '';
      }
    });
  };

  const clearDrawing = () => setPoints([]);

  return (
    <div>
      {showUpload && (
        <div id="uploadContainer">
          <input type="file" id="upload" accept="video/*" style={{ display: 'none' }} onChange={handleFileChange} ref={uploadInputRef} />
          <button onClick={triggerUpload}>Upload Video</button>
        </div>
      )}
      {showDrawing && (
        <div id="drawingContainer">
          <video ref={videoRef} style={{ display: 'none' }} />
          <canvas ref={canvasRef} style={{ border: '1px solid black' }} onMouseDown={handleMouseDown} onDoubleClick={handleDoubleClick} />
          <div>
            <input type="text" id="marking" readOnly />
            <input type="text" id="marking2" readOnly />
            <input type="text" id="marking3" readOnly />
            <input type="text" id="marking4" readOnly />
          </div>
          <button id="deleteButton" onClick={clearDrawing}>Clear Drawing</button>
          <button onClick={resetUpload}>Reset</button>
          <button onClick={cancelUpload}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default VideoPolygonDrawer;
