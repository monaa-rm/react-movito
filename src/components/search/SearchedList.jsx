import React, { useEffect, useRef } from "react";
import defaultImage from "../../assets/images/user.png";
import { useNavigate } from "react-router-dom";
import ellipsis from "../../assets/images/ellipsis.gif";




const SearchedList = ({ list, query, isSearching }) => {
  const navigate = useNavigate();
  const base_url = "https://image.tmdb.org/t/p/original/";
  const searchRef = useRef(null);


  return (
    <div
      ref={searchRef}
      className={`bg-neutral-950 border  text-white px-4  rounded border-neutral-800 ${
        list.length > 0 ? "h-[350px]" : ""
      } ${query == "" && "hidden"} overflow-x-hidden overflow-y-scroll`}
    >
      {list && list.length > 0
        ? list.map((item) => (
            <div className="flex items-center border-b p-1" key={item.id}>
              {item.img ? (
                <img
                  alt=""
                  src={`${base_url}${item.img}`}
                  className="w-10 h-14 rounded"
                />
              ) : (
                <img
                  alt=""
                  src={defaultImage}
                  className="w-10 h-14 py-2 bg-slate-200 rounded"
                />
              )}
              <div className="">
                <h1
                  className="pl-4 text-sm sm:text-base cursor-pointer"
                  onClick={() => navigate(`/movie/${item.id}`)}
                >
                  {item.name}
                </h1>
                <span className="pl-5 text-xs sm:text-sm text-slate-300">
                  {item.date}
                </span>
              </div>
            </div>
          ))
        : query.length > 1 &&
          isSearching == false && (
            <h1 className={`${query == "" ? "hidden" : "block"} py-2`}>
              No movies found
            </h1>
          )}
      {isSearching ? (
        <div>
          <img alt="" src={ellipsis} className="w-10" />
        </div>
      ) : null}
    </div>
  );
};

export default SearchedList;
