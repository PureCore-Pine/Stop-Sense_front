export type ClipType = {
    id: number;
    conflict: number;
    name: string;
    uploadDate: string;
  };
  
  // Clip data moved here
  export const allClips: ClipType[] = [
    { id: 1, name: 'Clip 1', uploadDate: '2023-01-01', conflict: 2 },
    { id: 2,name: 'Clip 2', uploadDate: '2023-01-02', conflict: 5 },
    { id: 3,name: 'Clip 3', uploadDate: '2024-02-01', conflict: 6 },
    { id: 4,name: 'Clip 4', uploadDate: '2024-02-02', conflict: 21 },
    { id: 5,name: 'Clip 5', uploadDate: '2024-02-02', conflict: 14 },
    { id: 6,name: 'Clip 6', uploadDate: '2024-02-02', conflict: 5 },
    { id: 7,name: 'Clip 7', uploadDate: '2024-02-02', conflict: 10 },
    { id: 8,name: 'Clip 8', uploadDate: '2024-02-02', conflict: 8},
    { id: 9,name: 'Clip 9', uploadDate: '2024-02-02', conflict: 25 },
    { id: 10,name: 'Clip 10', uploadDate: '2024-02-02', conflict: 10 },
    { id: 11,name: 'Clip 11', uploadDate: '2024-02-02', conflict: 5 },
    { id: 12,name: 'Clip 12', uploadDate: '2024-02-02', conflict: 8 },
    { id: 13,name: 'Clip 13', uploadDate: '2024-02-02', conflict: 999 },
    { id: 14,name: 'Clip 14', uploadDate: '2024-02-02', conflict: 14 },
    { id: 15,name: 'Clip 15', uploadDate: '2024-02-02', conflict: 9 },

  ];
  