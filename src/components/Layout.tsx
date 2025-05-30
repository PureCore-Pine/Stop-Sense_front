import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { useLocation } from "react-router-dom";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const location = useLocation();
  const path = location.pathname;
  const showSidebar = path !== "/login";

  return (
    <div className="flex h-screen">
      {showSidebar && (
        <Sidebar
          isExpanded={isExpanded}
          toggleSidebar={() => setIsExpanded(!isExpanded)}
        />
      )}

      <div
        className={`transition-all duration-300 p-5 w-full flex justify-center ${
          showSidebar ? (isExpanded ? "ml-64" : "ml-16") : "ml-0"
        }`}
      >
        <div className="w-full max-w-screen-lg">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
