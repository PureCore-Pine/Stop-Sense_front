import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import axios from "axios";
import { API_IP } from "../assets/constant";
import { IoMdArrowRoundBack } from "react-icons/io";

import { useTranslation } from "react-i18next";

interface ClipData {
  clip_id: string;
  user_id: string;
  name: string;
  video_path: string;
  width: number;
  distance: number;
  number_conflict: number;
  upload_date: string;
  point: number[][];
  description: string;
}

const ViewClip: React.FC = () => {
  const { t, i18n } = useTranslation();

  const { clip_id } = useParams();
  const navigate = useNavigate();

  const [clipData, setClipData] = useState<ClipData>({
    clip_id: '',
    user_id: '',
    name: '',
    video_path: '',
    width: 0,
    distance: 0,
    number_conflict: 0,
    upload_date: '',
    point: [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0]
    ],
    description: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      await axios.get(API_IP + `/getClipID/${clip_id}`)
        .then(res => {
          console.log(res.data.clip)
          setClipData(res.data.clip)
        })
        .catch(err => {
          console.warn({ err })
        })
    }
    fetchData()
  }, [clip_id]);

  return (
    <div>
      <div
        className="justify-start "
        style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
      >

        <div
          className="rounded-xl shadow-lg p-6 w-full max-w-4xl"
          style={{ backgroundColor: 'var(--view-bg)', color: 'var(--text-color)' }}>
          <h2 className="text-2xl font-bold mb-6">{clipData.name}</h2>
          <div className="w-full flex justify-center">
            {/* <ReactPlayer url={clipData.video_path} controls width="75%" height="400px" /> */}
            <ReactPlayer url="/video/result/Bake@DomeV31.mp4" controls width="75%" height="400px" />

          </div>
          <div className="mt-6 p-4 rounded-lg shadow" style={{ backgroundColor: 'var(--bg-color)' }}>
            <div className="grid grid-cols-3 gap-4">
              <div className="pl-6">
                <p className="text-lg font-semibold">
                  {t('view.width')}: {clipData.width} {t('view.unit')}
                </p>
              </div>
              <div className="pl-6">
                <p className="text-lg font-semibold">
                {t('view.distance')}: {clipData.distance} {t('view.unit')}
                </p>
              </div>
              <div className="pl-6">
                <p className="text-lg font-semibold">
                {t('view.conflicts')}: {clipData.number_conflict}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 rounded-lg shadow flex justify-between items-start" style={{ backgroundColor: 'var(--bg-color)' }}>
            <div className="pl-6">
              <p className="text-lg font-bold mb-2">
                {/* Marking Points */}
                {t('view.markPoint')}
                </p>
              {clipData.point.map(([x, y], index) => (
                <p key={index} className="font-mono">
                {t('view.point')} {index + 1}: ({x}, {y})
                </p>
              ))}
            </div>

            <div className="pr-6 text-right">
              <p className="mt-2 text-lg">
              {t('view.uploadDate')}: {clipData.upload_date}
                </p>
            </div>
          </div>

          <div className="mt-6 p-4 rounded-lg shadow pl-6" style={{ backgroundColor: 'var(--bg-color)' }}>
            <p className="text-lg font-semibold mb-2">
              {/* Description */}
              {t('view.description')}
              </p>
            {/* <p className="text-gray-700">{clipData.description}</p> */}
            <p className="mt-2 text-lg">{clipData.description}</p>
          </div>
        </div>
      </div>
    </div>

  );
};

export default ViewClip;
