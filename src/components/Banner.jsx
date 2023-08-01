import axios from "../axios";
import React, { useEffect, useState } from "react";
import requests from "../requests";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const [movie, setMovie] = useState([]);
  const [movieImg, setMovieImg] = useState("");
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const request = await axios.get(requests.fetchTopRated);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
        );
      return request;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);


  const truncate = (string, n) => {
   return string?.length > n ? string.substring(0, n - 1) + " ..." : string;
  };


  return (
    <div className="w-full h-[40vh] sm:h-[60vh] z-10">
      <div
        style={{
          background: `url(https://image.tmdb.org/t/p/original${movie?.backdrop_path}) center center`,
        }}
        className={`w-full h-full bg-cover bg-center relative overflow-hidden`}
      >
        <div className="absolute top-[10%] sm:top-[30%] p-8">
          <h1 className="font-bold text-2xl sm:text-3xl text-white">{movie?.name || movie?.title || movie?.original_name }</h1>
          <div className="flex space-x-1 p-1">
            <button onClick={() => navigate(`/movie/${movie.id}`)} className="px-10 py-1 font-bold rounded opacity-70 text-white bg-gray-800 hover:bg-gray-900 transition-all duration-150 ease-in-out">
              Show
            </button>

          </div>
          <p className="font-semibold text-white max-w-xl pt-2">
            {truncate(movie?.overview,150
            )}
          </p>
        </div>
        <div
          className="h-[30%] w-full absolute top-[70%]"
          style={{
            backgroundImage:
              "linear-gradient(180deg,transparent,rgba(37,37,37,0.61), #171717)",
          }}
        />
      </div>
    </div>
  );
};

export default Banner;
