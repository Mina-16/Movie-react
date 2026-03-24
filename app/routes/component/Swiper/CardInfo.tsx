import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router";

const CardInfo = ({
  dece,
  logo,
  title,
  textBtn,
  btnClasses,
  map,
  children,
}: {
  dece?: string;
  logo?: string;
  title?: string;
  textBtn?: string;
  btnClasses?: string;
  map?: { id: string }[];
  children?: React.ReactNode;
}) => {
  return (
    <div
      className="
        flex flex-col justify-center 
        absolute lg:left-20 
        px-4 sm:px-6 lg:px-0
        max-w-full sm:max-w-md
        top-1/2 -translate-y-1/2 lg:top-1/3
      "
    >
      {/* Logo */}
      <div className="relative w-full max-h-32 sm:max-h-40">
        <img
          alt="logo"
          src={logo}
          className="w-32 sm:w-40 lg:w-full h-auto object-contain"
        />
      </div>

      {/* Title */}
      <h1 className="text-white font-semibold text-2xl sm:text-3xl lg:text-5xl mt-2">
        {title}
      </h1>

      {/* Description */}
      <p className="text-gray-200 text-sm sm:text-lg lg:text-xl mt-3 line-clamp-3">
        {dece}
      </p>

      {/* Buttons */}
      <div className="flex flex-wrap gap-3 mt-4">
        {map?.map((movie) => (
          <Link
            to={`/movie/${movie.id}`}
            key={movie.id}
            className="decoration-none"
          >
            <Button
              className={`rounded-full border-none outline-none 
              text-sm sm:text-base
              px-4 py-2
              hover:scale-105 hover:shadow-lg hover:shadow-red-400/50 
              ${btnClasses || ""}`}
            >
              {textBtn || "Find out more!"}
            </Button>
          </Link>
        ))}
      </div>

      {children}
    </div>
  );
};

export default CardInfo;