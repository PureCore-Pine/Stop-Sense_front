// import React, { useEffect, useState } from 'react';
// import ViewButton from '../components/ViewButton';
// import DeleteButton from '../components/DeleteButton';
// import SearchClip from '../components/SearchClip';
// import axios from 'axios';
// import { API_IP } from '../assets/constant';
// import { useNavigate } from 'react-router-dom';

// type ClipType = {
//   clip_id: string;
//   number_conflict: number;
//   name: string;
//   upload_date: string;
// };

// const HistoryPage: React.FC = () => {
//   const navigate = useNavigate(); // Initialize navigation


//   const [clips, setClips] = useState<ClipType[]>([]);
//   const [searchTerm, setSearchTerm] = useState<string>('');

//   const user_id = localStorage.getItem('user_id');
//   useEffect(() => {
//     const fetchData = async () => {
//       // if (!user_id) {
//       //   console.warn("No user_id found in localStorage");
//       //   return;
//       // }

//       try {

//         const res = await axios.post(`${API_IP}/getAllClips`, { user_id });

//         if (res.data && res.data.clips) {
//           setClips(res.data.clips);
//         } else {
//           console.warn("Unexpected response format:", res.data);
//         }
//       } catch (err) {
//         console.error("Error fetching clips:", err);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleView = (clip_id: string) => {
//     alert(`Viewing clip with ID: ${clip_id}`);

//     navigate(`/viewclip/${clip_id}`)
//     // navigate('/viewclip', { state: { clip_id } });


//   };

//   const handleDelete = async (clip_id: string) => {
//     try {
//       await axios.delete(`${API_IP}/deleteClip`, {
//         data: { clip_id }, // Correct way to send data in DELETE request
//       })
//         .then(res => {
//           console.log("Delete Response:", res.data);
//           setClips((prevClips) => prevClips.filter((clip) => clip.clip_id !== clip_id));
//         })
//         .catch(err => {
//           console.warn("Failed to delete clip:", err.data.message);

//         })
//     } catch (error) {
//       console.error("Error deleting clip:", error);
//     }
//   };


//   const filteredClips = clips.filter((clip) =>
//     clip.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen w-full bg-gray-100 flex flex-col items-center">
//       <div className="w-full max-w-screen-2xl bg-white p-6 rounded-lg shadow-lg">
//         {/* Title and Search Box */}
//         <div className="flex justify-between items-center mb-4">
//           <h1 className="text-3xl font-bold">History</h1>
//           <SearchClip searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
//         </div>

//         {/* Table */}
//         <div className="overflow-x-auto">
//           <table className="w-full border-collapse bg-white shadow-md rounded-lg">
//             <thead className="bg-red-700 text-white">
//               <tr>
//                 <th className="p-3 text-left">Clip Name</th>
//                 <th className="p-3 text-left">Upload Date</th>
//                 <th className="p-3 text-center">Conflict</th>
//                 <th className="p-3 text-center">Actions</th>
//               </tr>
//             </thead>

//             {filteredClips.length === 0 ?
//               <tbody>
//                 <tr>
//                   <td colSpan={4} className="text-center p-6">
//                     <h1 className="text-2xl font-bold text-gray-500">No data</h1>
//                   </td>
//                 </tr>
//               </tbody>
//               :
//               <tbody>
//                 {filteredClips.map((clip) => (
//                   <tr key={clip.clip_id} className="border-b hover:bg-gray-100 transition">
//                     <td className="p-3">{clip.name}</td>
//                     <td className="p-3">{clip.upload_date}</td>
//                     <td className={`p-3 text-center ${clip.number_conflict > 10 ? 'text-red-600' : 'text-black'}`}>
//                       {clip.number_conflict}
//                     </td>
//                     <td className="p-3 flex justify-center gap-3">
//                       <ViewButton onClick={() => handleView(clip.clip_id)} />
//                       <DeleteButton onClick={() => handleDelete(clip.clip_id)} />
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             }
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HistoryPage;



import React, { useEffect, useState } from 'react';
import ViewButton from '../components/ViewButton';
import DeleteButton from '../components/DeleteButton';
import SearchClip from '../components/SearchClip';
import axios from 'axios';
import { API_IP, RED_COLOR_50, REDCOLOR, YELLOW_COLOR_50, YELLOWCOLOR } from '../assets/constant';
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
  }, [user_id]); // Added user_id to the dependency array

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
    <div className="min-h-screen w-full bg-gray-100 flex flex-col items-center">
      <div className="w-full max-w-screen-2xl bg-white p-6 rounded-lg shadow-lg">
        {/* Title and Search Box */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">History</h1>
          <SearchClip searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>

        {/* Table */}
        {/* <div className="overflow-x-auto">
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
              {filteredClips.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center p-6">
                    <h1 className="text-2xl font-bold text-gray-500">No data</h1>
                  </td>
                </tr>
              ) : (
                filteredClips.map((clip) => (
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
                ))
              )}
            </tbody>
          </table>
        </div> */}

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
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

              return (
                <div
                  key={index}
                  style={{
                    backgroundColor: clip.number_conflict >= 20 ? RED_COLOR_50 : YELLOW_COLOR_50,
                    borderRadius: '10px',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '180px',
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  {/* Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h1 style={{ fontWeight: 'bold', fontSize: '20px' }}>{clip.name}</h1>
                    <button
                      onClick={() => handleDelete(clip.clip_id)}
                    >
                      <FaTrash size={20} />
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
                      backgroundColor: clip.number_conflict >= 20 ? REDCOLOR : YELLOWCOLOR,
                      color: '#fff',
                      borderRadius: '12px',
                      padding: '4px 16px',
                      marginTop: '10px',
                      alignSelf: 'flex-start',
                    }}
                  >
                    {'View'}
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
