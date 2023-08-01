import React from "react";
import { useNavigate } from "react-router-dom";
import DefaultImage from"../../assets/images/user.png" 


const ShowCasts = ({ actors }) => {
    const navigate = useNavigate();




  const base_url = "https://image.tmdb.org/t/p/original/";

  return (
    <div className="pt-8  bg-neutral-900">
      <div className=" px-6 py-2 ">
        <h2 className=" text-lg text-white sm:text-xl pb-1">Casts</h2>
        <div
          className={`overflow-y-hidden mx-auto ${
            actors?.length > 8 && "overflow-x-scroll"
          } flex space-x-3 py-5 scroll whitespace-nowrap scroll-smooth`}
        >
          {actors?.map(
            (actor,index) =>
             (
                <div
                key={index}
                  onClick={() => navigate(`/person/${actor.id}`)}
                  className=" rounded-md border border-white border-opacity-10 hover:border-opacity-30 pb-4 cursor-pointer shadow-sm hover:shadow-md shadow-neutral-700 hover:shadow-neutral-700 transition-all duration-150 ease-in-out"
                >
                  <img
                    alt=""
                    src={actor.profile_path ? `${base_url}${actor.profile_path}` : DefaultImage }
                    className="w-[120px] h-[200px] bg-slate-200 sm:h-[230px] sm:w-[155px] rounded-t-md " />
                  <h4 className="pl-2 text-sm text-white sm:text-base pt-2 truncate w-[120px] sm:w-[155px]">
                    {actor.name}
                  </h4>
                  <h4 className="text-xs text-gray-300 font-thin pl-2 truncate w-[120px] sm:w-[155px]">
                    {actor.character}
                  </h4>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowCasts;
