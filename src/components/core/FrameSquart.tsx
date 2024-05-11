export const FrameSquart = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative max-w-[600px] border-2 border-[#CC9933] bg-[#F3D69A] p-2 font-merriweather  ">
      <div className=" absolute left-0 top-0 z-10 flex w-full justify-between">
        <div className="h-[20px] w-[20px] border-b-2 border-r-2 border-[#CC9933] "></div>
        <div className="h-[20px] w-[20px] border-b-2 border-l-2 border-[#CC9933] "></div>
      </div>
      <div className="relative flex h-full flex-col gap-5 border-2 border-[#CC9933] bg-[#F3D69A] p-4">
        <div className="h-full w-full justify-center overflow-auto py-3">
          {children}
        </div>
      </div>
      <div className=" absolute bottom-0 left-0 z-10 flex w-full justify-between">
        <div className="h-[20px] w-[20px] border-r-2 border-t-2 border-[#CC9933]"></div>
        <div className="h-[20px] w-[20px] border-l-2 border-t-2 border-[#CC9933]"></div>
      </div>
    </div>
  );
};

export const FrameSquartNormal = ({
  children,
  className = "bg-[#F3D69A]",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={"relative border-2 border-[#CC9933] p-2 " + className}>
      <div className=" absolute left-0 top-0 z-10 flex w-full justify-between">
        <div className="h-[20px] w-[20px] border-b-2 border-r-2 border-[#CC9933] "></div>
        <div className="h-[20px] w-[20px] border-b-2 border-l-2 border-[#CC9933] "></div>
      </div>
      <div
        className={
          "relative flex h-full flex-col gap-5 border-2 border-[#CC9933] " +
          className
        }
      >
        <div className="h-full w-full justify-center overflow-auto py-3">
          {children}
        </div>
      </div>
      <div className=" absolute bottom-0 left-0 z-10 flex w-full justify-between">
        <div className="h-[20px] w-[20px] border-r-2 border-t-2 border-[#CC9933]"></div>
        <div className="h-[20px] w-[20px] border-l-2 border-t-2 border-[#CC9933]"></div>
      </div>
    </div>
  );
};
