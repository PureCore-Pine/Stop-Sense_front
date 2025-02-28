const Background = ({ children }: { children?: React.ReactNode }) => {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-[#B0595C] shadow-[inset_0px_0px_120px_120px_#00000060]">
        {children}
      </div>
    );
  };
  
  export default Background;
  