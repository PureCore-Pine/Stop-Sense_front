import React, { useState } from 'react';

import { allClips, ClipType } from '../models/ClipsData';
import ViewButton from '../components/ViewButton';
import DeleteButton from '../components/DeleteButton';
import SearchClip from '../components/SearchClip';
import { REDCOLOR } from '../assets/constant';

const HistoryPage: React.FC = () => {
    const [clips, setClips] = useState<ClipType[]>(allClips);
    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleView = (id: number) => {
        alert(`Viewing clip with ID: ${id}`);
    };

    const handleDelete = (id: number) => {
        setClips(clips.filter(clip => clip.id !== id));
    };

    const filteredClips = clips.filter(clip =>
        clip.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen w-full flex flex-col items-center">
            <div className="w-full max-w-screen-2xl bg-white p-6 rounded-lg shadow-lg">

                {/* Title and Search Box */}
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-3xl font-bold">History</h1>
                    <SearchClip searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse bg-white shadow-md rounded-lg">
                        {/* <thead className="bg-red-700 text-white"> */}
                        <thead className={`bg-[${REDCOLOR}] text-white`}>
                            <tr>
                                <th className="p-3 text-left">Clip Name</th>
                                <th className="p-3 text-left">Upload Date</th>
                                <th className="p-3 text-center">Conflict</th> {/* Center Conflict */}
                                <th className="p-3 text-center">Actions</th> {/* Center Actions */}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredClips.map((clip: ClipType) => (
                                <tr
                                    key={clip.id}
                                    className="border-b hover:bg-gray-100 transition"
                                >
                                    <td className="p-3">{clip.name}</td>
                                    <td className="p-3">{clip.uploadDate}</td>
                                    <td
                                        className={`p-3 text-center ${clip.conflict > 10 ? 'text-red-600' : 'text-black'}`}
                                    >
                                        {clip.conflict}
                                    </td>
                                    <td className="p-3 flex justify-center gap-3"> {/* Center Buttons */}
                                        <ViewButton onClick={() => handleView(clip.id)} />
                                        <DeleteButton onClick={() => handleDelete(clip.id)} />
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
