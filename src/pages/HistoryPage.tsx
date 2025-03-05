import React, { useEffect, useState } from 'react';
import ViewButton from '../components/ViewButton';
import DeleteButton from '../components/DeleteButton';
import SearchClip from '../components/SearchClip';
import axios from 'axios';
import { API_IP } from '../assets/constant';

type ClipType = {
  clip_id: number;
  number_conflict: number;
  name: string;
  upload_date: string;
};

const HistoryPage: React.FC = () => {
  const [clips, setClips] = useState<ClipType[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      const user_id = localStorage.getItem('user_id');
      if (!user_id) {
        console.warn("No user_id found in localStorage");
        return;
      }

      try {
        const res = await axios.post(`${API_IP}/getAllClips`, { user_id });

        if (res.data && res.data.clips) {
          setClips(res.data.clips);
        } else {
          console.warn("Unexpected response format:", res.data);
        }
      } catch (err) {
        console.error("Error fetching clips:", err);
      }
    };

    fetchData();
  }, []);

  const handleView = (clip_id: number) => {
    alert(`Viewing clip with ID: ${clip_id}`);
  };

  const handleDelete = (clip_id: number) => {
    setClips((prevClips) => prevClips.filter((clip) => clip.clip_id !== clip_id));
  };

  const filteredClips = clips.filter((clip) =>
    clip.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full bg-gray-100 flex flex-col items-center">
      <div className="w-full max-w-screen-2xl bg-white p-6 rounded-lg shadow-lg">
        {/* Title and Search Box */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">History</h1>
          <SearchClip searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white shadow-md rounded-lg">
            <thead className="bg-red-700 text-white">
              <tr>
                <th className="p-3 text-left">Clip Name</th>
                <th className="p-3 text-left">Upload Date</th>
                <th className="p-3 text-center">Conflict</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredClips.map((clip) => (
                <tr key={clip.clip_id} className="border-b hover:bg-gray-100 transition">
                  <td className="p-3">{clip.name}</td>
                  <td className="p-3">{clip.upload_date}</td>
                  <td className={`p-3 text-center ${clip.number_conflict > 10 ? 'text-red-600' : 'text-black'}`}>
                    {clip.number_conflict}
                  </td>
                  <td className="p-3 flex justify-center gap-3">
                    <ViewButton onClick={() => handleView(clip.clip_id)} />
                    <DeleteButton onClick={() => handleDelete(clip.clip_id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
