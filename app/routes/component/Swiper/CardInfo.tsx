import React from "react";
// import {motion} from "framer-motion";
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
  map?: {id: string}[];
  children?: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col justify-center absolute left-20  max-w-md">
      <div className="relative w-full max-h-40">
        <img alt="logo" src={logo} className="object-cover" />
      </div>
      <h1 className="text-white font-semibold text-5xl">{title}</h1>
      <p className={`text-gray-200 text-xl mt-3`}>{dece}</p>
      {map?.map((movie) => (
        <Link
          to={`/movie/${movie.id}`}
          key={movie.id}
          className="decoration-none"
        >
          <Button
            className={`rounded-full mt-5 border-none outline-none hover:scale-105
    hover:shadow-lg
    hover:shadow-red-400/50 ${btnClasses || ""}`}
          >
            {textBtn || "Find out more!"}
          </Button>
        </Link>
      ))}
      {children}
    </div>
  );
};

export default CardInfo;
