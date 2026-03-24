"use client";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type SwiperType from "swiper";

import "swiper/css";
import { Autoplay } from "swiper/modules";
import Progress from "./Progress";

const SwiperCard = ({
  items,
  paginationImages,
  className,
  classProgress
}: {
  items: { src: string; card: ReactNode }[];
  paginationImages?: boolean;
  className?: string;
  classProgress: string;
}) => {
  const [swiper, setSwiper] = useState<SwiperType | null>();
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 3.5));
    }, 110);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    swiper?.on("slideChange", () => {
      setProgress(0);
    });
  }, [swiper]);
  return (
    <div className="flex flex-col gap-2 relative items-center ">
      <Swiper
        autoplay={{ delay: 3000 }}
        modules={[Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        className={`w-full object-cover ${className || ""}`}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        onSwiper={setSwiper}
      >
        {items.map(({ card }, i) => (
          <SwiperSlide key={i}>{card}</SwiperSlide>
        ))}
      </Swiper>

      <Progress
        paginationImages={paginationImages}
        map={items}
        swiper={swiper}
        activeIndex={activeIndex}
        progress={progress}
        className={classProgress}
      />
    </div>
  );
};

export default SwiperCard;
