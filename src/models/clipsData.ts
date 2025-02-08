export type ClipType = {
  id: number;
  name: string;
  uploadDate: string;
};

// Clip data
export const allClips: ClipType[] = [
  { id: 1, name: 'Clip 1', uploadDate: '2023-01-01' },
  { id: 2, name: 'Clip 2', uploadDate: '2023-01-02' },
  { id: 3, name: 'Clip 3', uploadDate: '2024-02-01' },
  { id: 4, name: 'Clip 4', uploadDate: '2024-02-02' },
];
