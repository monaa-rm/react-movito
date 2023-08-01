import axios from "../axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Row = ({ title, fetchUrl, isLargeRow = false }) => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const fetchData = async () => {
    const request = await axios.get(fetchUrl);
    setMovies(request.data.results);
    return request;
  };
  const base_url = "https://image.tmdb.org/t/p/original/";
  useEffect(() => {
    fetchData();
  }, [fetchUrl]);

  return (
    <div className="text-white ml-1 px-6 py-3 ">
      <h2 className="font-bold sm:text-lg pb-1">{title}</h2>
      <div className="h-44 overflow-y-hidden overflow-x-scroll flex items-center scroll whitespace-nowrap scroll-smooth">
        {movies.map(
          (movie) =>
            (!isLargeRow && movie.poster_path) ||
            (isLargeRow && movie.backdrop_path && (
              <img
                onClick={() => {
                  navigate(`/movie/${movie.id}`);
                }}
                src={`${base_url}${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                className={` object-contain cursor-pointer px-1 hover:scale-105 transition-all duration-200 ease-in-out ${
                  isLargeRow ? "max-h-40" : "max-h-36"
                }`}
                key={movie.id}
                alt={movie.name}
              />
            ))
        )}
      </div>
    </div>
  );
};

export default Row;
