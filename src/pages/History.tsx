import React from "react";

import ViewButton from '../components/ViewButton';
import DeleteButton from '../components/DeleteButton';

import { ClipType, allClips } from "../models/clipsData";

const History: React.FC = () => {
  const handleView = (id: number) => {
    alert(`Viewing clip with ID: ${id}`);
  };

  const handleDelete = (id: number) => {
    alert(`Deleting clip with ID: ${id}`);
  };

  return (
    <div>
      <h1>All Clips</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Clip Name</th>
            <th>Upload Date</th>
          </tr>
        </thead>
        <tbody>
          {allClips.map((clip: ClipType) => (
            <tr key={clip.id}>
              <td>{clip.id}</td>
              <td>{clip.name}</td>
              <td>{clip.uploadDate}</td>
              <td>
                <ViewButton onClick={() => handleView(clip.id)} />
                <DeleteButton onClick={() => handleDelete(clip.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default History;
