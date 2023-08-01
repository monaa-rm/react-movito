import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { useParams } from "react-router-dom";
import ShowCasts from "./ShowCasts";
import PlayMovie from "./PlayMovie";
import { MdFavorite } from "react-icons/md";
import DefaultImage from "../../assets/images/user.png";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFavoriteMovieId,
  fetchMovieActors,
  fetchMovieDetails,
  fetchMovieImages,
  toggleFavorite,
} from "../../features/movieSlice";
import Spinner from "../../utils/Spinner";
import { Helmet } from "react-helmet-async";
import ErrorPage from "./ErrorPage";

const Details = () => {
  const { movieId } = useParams();
  const dispatch = useDispatch();

  const actors = useSelector((state) => state.movies.movieActors);

  const details = useSelector((state) => state.movies.movieDetails);
  const images = useSelector((state) => state.movies.movieImages);
  const loading = useSelector((state) => state.movies.loading);
  const error = useSelector((state) => state.movies.error);
  const { name, year, genres, overview, language, tagline, crew, keys } =
    details;
  const { bg, poster } = images;
  const favorites = useSelector((state) => state.movies.favorite);
  const isLiked = favorites?.includes(movieId);
  const likeHandler = () => {
    dispatch(toggleFavorite(movieId));
  };
  const fetchData = () => {
    dispatch(fetchMovieDetails(movieId));
    dispatch(fetchMovieActors(movieId));
    dispatch(fetchMovieImages(movieId));
    dispatch(fetchFavoriteMovieId());
  }

  useEffect(() => {
    fetchData()

    return fetchData()

  }, []);

  if (loading) {
    return <Spinner />;
  }else if(error){
    return <ErrorPage />
  }else{
    return (
      <>
        <div className="bg-neutral-900 min-h-screen">
        <Helmet>
          <title>{`MOVITO -`+ name}</title>
        </Helmet>
          <Navbar />
          <div
            style={{
              background: `url(https://image.tmdb.org/t/p/original${bg}) center`,
            }}
            className={` sm:h-4/5  bg-cover bg-no-repeat `}
          >
            <div className="bg-neutral-900 sm:bg-stone-500  sm:bg-opacity-70   w-full sm:min-h-[450px] grid grid-cols-1 sm:grid-cols-12 items-center sm:pt-14 ">
              <div className=" sm:p-2  lg:p-8 sm:col-start-1 sm:col-span-4 md:col-span-3">
                {poster ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${poster}`}
                    className="mx-auto w-full rounded-md min-w-[100px]"
                  />
                ) : (
                  <img
                    src={DefaultImage}
                    className="mx-auto w-2/3 pt-5 rounded-md min-w-[100px]"
                  />
                )}
              </div>
              <div className=" sm:col-start-5 md:col-start-4 sm:col-span-12 p-8">
                <div className="block md:flex items-center justify-start">
                  <div className="flex items-center">
                    <MdFavorite
                      onClick={() => likeHandler()}
                      className={`text-2xl mr-1 ${
                        isLiked ? "text-red-600" : "text-white"
                      } cursor-pointer hover:text-red-500 active:text-red-600`}
                    />
                    <h1 className="text-white text-lg sm:text-2xl lg:text-3xl font-bold">
                      {name}
                    </h1>
                  </div>

                  <span className="ml-7 sm:ml-1 text-gray-300 text-lg md:text-xl lg:text-2xl">
                    {year && `(${year})`}
                  </span>
                </div>
                <div className="ml-7 ">
                  {genres?.map((gnr, index) => (
                    <span className=" font-thin text-sm text-white" key={index}>
                      {index == genres.length - 1 ? gnr.name : `${gnr.name}, `}
                    </span>
                  ))}
                  {language && (
                    <span className="font-thin text-sm text-gray-300">
                      {" "}
                      | {language}
                    </span>
                  )}
                </div>

                {tagline && (
                  <h1 className="ml-7  text-gray-300 text-lg font-thin  mt-2">
                    {tagline}
                  </h1>
                )}

                {overview && (
                  <h1 className="text-white text-xl font-bold mt-8">
                    Overview
                  </h1>
                )}
                {overview && <p className="text-gray-100">{overview}</p>}

                {actors && actors.length > 0 && (
                  <h1 className="text-white text-xl font-bold mt-4">Stars</h1>
                )}
                {actors &&
                  actors
                    .slice(0, Math.min(5, actors.length))
                    .map((actor, index) => (
                      <span key={index} className="text-gray-100">
                        {index == actors.length - 1 || index == 4
                          ? actor.name
                          : ` ${actor.name}, `}
                      </span>
                    ))}
                <div className="flex justify-start space-x-32 pt-5">
                  {crew &&
                    crew.map((item) => (
                      <div key={item.id}>
                        <h1 className="text-white text-sm  font-bold">
                          {item.name}
                        </h1>
                        <h4 className="text-gray-300 text-sm ">Creator</h4>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>

          {actors && actors.length > 0 && <ShowCasts actors={actors} />}
          {keys && <PlayMovie keys={keys} name={name} />}
        </div>
      </>
    );
  }
};

export default Details;
