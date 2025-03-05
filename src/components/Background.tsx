// import React from "react";

// // const Background = ({ children,props }: { children?: React.ReactNode,props: string }) => {
// const Background = ({ children}: { children?: React.ReactNode}) => {

//     return (
//       <div className="w-screen h-screen flex items-center justify-center  shadow-[inset_0px_0px_120px_120px_#00000060]" style={{backgroundColor: '#B0595C'}}>
//       {/* <div className={`w-screen h-screen flex items-center justify-center bg-[${props}] shadow-[inset_0px_0px_120px_120px_#00000060]`}> */}
//         {children}
//       </div>
//     );
//   };
  
//   export default Background;
  

import React from "react";

const Background = ({
  children,
  backgroundColor = "#B0595C", // Default color if no prop is passed
}: {
  children?: React.ReactNode;
  backgroundColor?: string;
}) => {
  return (
    <div
      className="w-screen h-screen flex items-center justify-center shadow-[inset_0px_0px_120px_120px_#00000060]"
      style={{ backgroundColor}}
    >
      {children}
    </div>
  );
};

export default Background;
