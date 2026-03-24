import React, { type ReactNode } from "react";

const Progress = ({
  paginationImages,
  map,
  swiper,
  activeIndex,
  progress,
  className,
}: {
  paginationImages: boolean;
  map: { src: string }[];
  className: {
    flex?: boolean;
    itemEnd?: boolean;
    justifyEnd?: boolean;
    translateY?: boolean;
    gap?: string;
    mr?: string;
    mb?: string;
    mt?: string;
    ml?: string;
  };
  swiper: ReactNode;
  activeIndex: ReactNode;
  progress: ReactNode;
}) => {
  const { flex, itemEnd, justifyEnd, translateY, gap} =
    className;

  return (
    <>
      <div
        className={`
        flex
        ${flex ? "flex" : "flex-col"}
        ${itemEnd ? "items-end" : "items-cnter"}
        ${justifyEnd ? "justify-end" : "justify-center"}
        gap-${gap} 
        absolute 
        inset-0 
        mr-30 
        mb-10
        `}
      >
        {paginationImages &&
          map.map(({ src }, i) => (
            <div
              onClick={() => swiper?.slideTo(i)}
              key={i}
              className={`
                ${i === activeIndex && `shadow-md opacity-90 ${translateY? "-translate-y-5" : "-translate-x-5"} border-white border-4`}
                rounded-xl
                z-10 
                relative 
                duration-[0.5s] 
                overflow-hidden 
                max-w-60 
                w-full 
                h-auto
                hover:shadow-md 
                hover:opacity-90
                ${translateY? "hover:-translate-y-5" : "hover:-translate-x-5"}
                `}
            >
              {i === activeIndex && (
                <div
                  style={{ width: `${progress}%` }}
                  className=" absolute inset-0 h-full z-10 bg-gray-400 opacity-30"
                ></div>
              )}
              <img alt="" src={src} className="object-cover" />
            </div>
          ))}
      </div>
    </>
  );
};

export default Progress;
