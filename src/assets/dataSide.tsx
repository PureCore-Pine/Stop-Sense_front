import { MdDashboard, MdOutlineFileUpload } from "react-icons/md";
import { FaHistory,FaChartPie } from "react-icons/fa";

import { ReactNode } from "react";

interface NavItem {
  id: number;
  icon: ReactNode;
  title: string;
  path: string;
}

export const navItem: NavItem[] = [
  {
    id: 1,
    icon: <FaChartPie size={24} />,
    title: 'Dashboard',
    path: '/dashboard',
  },
  {
    id: 2,
    icon: <MdOutlineFileUpload size={24}/>,
    title: 'Upload',
    path: '/upload',
  },
  {
    id: 3,
    icon: <FaHistory size={24}/>,
    title: 'History',
    path: '/history',
  },
//   {
//     id: 4,
//     icon: <IoIosLogOut />,
//     title: 'Logout',
//     path: '/login',
//   },
];