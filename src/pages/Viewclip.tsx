import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import axios from "axios";

interface ClipData {
  clip_id: string;
  name: string;
  video_path: string;
  width: number;
  distance: number;
  number_conflict: number;

  processingTime: string;
  date: string;
  point: { x: number; y: number }[][];
  description: string;
}

const mockData: ClipData = {
  name: "Example Clip",
  video_path: "https://www.youtube.com/watch?v=fXw1PERFGMs",
  width: 9,
  distance: 200,
  number_conflict: 20,
  processingTime: "56 min.",
  date: "12-12-2025",
  point: [
    { x: 23, y: 23 },
    { x: 102, y: 23 },
    { x: 10, y: 400 },
    { x: 156, y: 400 }
  ],
  description: "This is an example description. The real data will be loaded from API."
};

const ViewClip: React.FC = () => {
  const { clip_id } = useParams();
  const [clipData, setClipData] = useState<ClipData>(mockData);


  console.log('>>', clip_id)


  useEffect(() => {
    if (!clip_id) {
      console.warn("No clip_id provided, using mock data.");
      return;
    }

    // axios.get(`https://api.example.com/clipdata/${clip_id}`)
    //   .then((response) => {
    //     setClipData(response.data);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching clip data:", error);
    //   });
  }, [clip_id]);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">&lt;{clipData.name}&gt;</h2>

      {/* Video Player */}
      <div className="w-full flex justify-center">
        <ReactPlayer url={clipData.video_path} controls width="75%" height="400px" />
      </div>

      {/* ✅ กล่องข้อมูลหลัก */}
      <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow ">
        <div className="grid grid-cols-3 gap-4">
        <div className="pl-6">
            <p className="text-lg font-semibold">Width {clipData.width} m.</p>
          </div>
          <div className="pl-15">
            <p className="text-lg font-semibold">Distance {clipData.distance} m.</p>
          </div>
          <div className="pl-15">
            <p className="text-lg font-semibold">Conflicts {clipData.conflicts}</p>
          </div>
        </div>
      </div>

{/* Marking Points + Date & Time */}
<div className="mt-6 bg-gray-100 p-4 rounded-lg shadow flex justify-between items-start">
  {/* ✅ Marking Points (ด้านซ้าย) */}
  <div className="pl-6">
    <p className="text-lg font-bold mb-2">Marking Points</p>
    {clipData.markingPoints.map((point, index) => (
      <p key={index} className="font-mono">
        x{index + 1},y{index + 1} ({point.x}, {point.y})
      </p>
    ))}
  </div>

  {/* ✅ Date & Time (ด้านขวา) */}
  <div className="pr-6 text-right">
    
    <p className="mt-8 text-lg  ">Time : {clipData.processingTime}</p>
    <p className="mt-2 text-lg ">Date : {clipData.date}</p>
  </div>
</div>

      {/* Description */}
      <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow pl-6">
        <p className="text-lg font-semibold mb-2">Description</p>
        <p className="text-gray-700">{clipData.description}</p>
      </div>
    </div>
  );
};

export default ViewClip;
