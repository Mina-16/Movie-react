import React, { useEffect, useState, type ReactElement } from "react";
import SwiperCard from "./SwiperCard";
import CardInfo from "./CardInfo";
import { CardMedia } from "@mui/material";

interface Movie {
  id: number;
}

interface Props {
  mapName: { img: string; logo: string }[];
  mapLink: Movie[];
  cProgress?: string;
  start: number;
  end: number;
}

const ViweSwiper = ({ mapName, mapLink, cProgress, start, end }: Props) => {
  const movies = mapLink.slice(start, end);

  return (
    <div>
      <SwiperCard
        classProgress={cProgress}
        className="xl:h-[100vh]"
        paginationImages
        items={mapName.map((movie) => ({
          card: (
            <section className="relative">
              {/* الصورة */}
              <CardMedia component="img" height="200px" image={movie.img} />

              {/* Overlay داكن */}
              <div className="absolute inset-0 bg-black opacity-50 z-10 pointer-events-none"></div>

              {/* المحتوى فوق الصورة */}
              <div className="absolute inset-0 z-20 flex items-center pb-50">
                <CardInfo
                  btnClasses="hidden bg-red-500 mt-20 hover:bg-red-400"
                  logo={movie.logo}
                  map={movies}
                />
              </div>
            </section>
          ),
          src: movie.img,
        }))}
      />
    </div>
  );
};

export default ViweSwiper;
