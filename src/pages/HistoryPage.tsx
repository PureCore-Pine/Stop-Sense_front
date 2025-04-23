import React, { useEffect, useState } from 'react';
import ViewButton from '../components/ViewButton';
import DeleteButton from '../components/DeleteButton';
import SearchClip from '../components/SearchClip';
import axios from 'axios';
import { API_IP, REDCOLOR, RED_COLOR_50, YELLOWCOLOR, YELLOW_COLOR_50 } from '../assets/constant';
import { useNavigate } from 'react-router-dom';
import { FaCarCrash, FaTrash } from 'react-icons/fa';
import { IoMdTime } from 'react-icons/io';

type ClipType = {
  clip_id: string;
  number_conflict: number;
  name: string;
  upload_date: string;
};

const HistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const [clips, setClips] = useState<ClipType[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const user_id = localStorage.getItem('user_id');

  useEffect(() => {
    if (!user_id) {
      console.warn("No user_id found in localStorage");
      return;
    }

    const fetchData = async () => {
      try {
        const res = await axios.post(`${API_IP}/getAllClips`, { user_id });

        if (res.data?.clips) {
          setClips(res.data.clips);
        } else {
          console.warn("Unexpected response format:", res.data);
        }
      } catch (err) {
        console.error("Error fetching clips:", err);
      }
    };

    fetchData();
  }, [user_id]);

  const handleView = (clip_id: string) => {
    navigate(`/viewclip/${clip_id}`);
  };

  const handleDelete = async (clip_id: string) => {
    try {
      const res = await axios.delete(`${API_IP}/deleteClip`, { data: { clip_id } });
      console.log("Delete Response:", res.data);
      setClips((prevClips) => prevClips.filter((clip) => clip.clip_id !== clip_id));
    } catch (err: any) {
      console.warn("Failed to delete clip:", err?.response?.data?.message || err.message);
    }
  };

  const filteredClips = clips.filter((clip) =>
    clip.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full flex flex-col items-center" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
      <div className="w-full max-w-screen-2xl p-6 rounded-lg shadow-lg" style={{ backgroundColor: 'var(--card-bg)', color: 'var(--card-text)' }}>
        {/* Title and Search Box */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">History</h1>
          <SearchClip searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>

        {/* Grid View */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
            padding: '20px',
          }}
        >
          {filteredClips.length === 0 ? (
            <div className="text-center p-6 col-span-3">
              <h1 className="text-2xl font-bold text-gray-500">No data</h1>
            </div>
          ) : (
            filteredClips.map((clip, index) => {
              const cardBg = clip.number_conflict >= 20 ? RED_COLOR_50 : YELLOW_COLOR_50;
              const buttonBg = clip.number_conflict >= 20 ? REDCOLOR : YELLOWCOLOR;

              return (
                <div
                  key={index}
                  style={{
                    backgroundColor: cardBg,
                    borderRadius: '10px',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '180px',
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                    color: 'var(--card-text)',
                  }}
                >
                  {/* Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h1 style={{ fontWeight: 'bold', fontSize: '20px' }}>{clip.name}</h1>
                    <button onClick={() => handleDelete(clip.clip_id)}>
                      <FaTrash size={20} style={{ color: 'var(--text-color)' }} />
                    </button>
                  </div>

                  {/* Details */}
                  <div style={{ marginTop: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                      <FaCarCrash size={18} style={{ marginRight: '8px' }} />
                      <p>{clip.number_conflict}</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <IoMdTime size={18} style={{ marginRight: '8px' }} />
                      <p>{clip.upload_date}</p>
                    </div>
                  </div>

                  {/* Button */}
                  <button
                    onClick={() => handleView(clip.clip_id)}
                    style={{
                      backgroundColor: buttonBg,
                      color: '#fff',
                      borderRadius: '12px',
                      padding: '4px 16px',
                      marginTop: '10px',
                      alignSelf: 'flex-start',
                    }}
                  >
                    View
                  </button>
                </div>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
};

export default HistoryPage;