import axios from "axios";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { API_KEY } from "../../requests";
import SearchedList from "./SearchedList";

const Search = ({ showSearch, setShowSearch }) => {
  const [query, setQuery] = useState("");
  const [fixed, setFixed] = useState();
  const [searchList, setSearchList] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const searchRef = useRef(null);

  const transformationSearch = () => {
    if (window.scrollY > 200) {
      setFixed(true);
    } else {
      setFixed(false);
    }
  };

  const handleOutsideClick = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setShowSearch(false);
      setQuery("");
      setSearchList([]);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", transformationSearch);

    return () => window.removeEventListener("scroll", transformationSearch);
  }, [fixed]);

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    if (query.length == 0) {
      setSearchList([]);
    }
  }, [query]);

  const searchMovie = async (e) => {
    setQuery(e.target.value);

    setIsSearching(true);
    try {
      const request = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
      );
      if (request.status === 200) {
        const list = request.data.results.map((item) => ({
          id: item.id,
          name: item.name || item.title,
          // item.original_name ||
          // item.original_title,
          img: item.poster_path || item.backdrop_path,
          date: item.release_date || item.first_air_date,
        }));
        setSearchList(list);
      }
    } catch (error) {
      console.log(error.message);
    }
    setIsSearching(false);
  };
  const refreshDesabled = (e) => {
    if (e.keyCode === 13 || e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <div className="p-6 h-16 relative z-10" ref={searchRef}>
      <div
        className={`${
          fixed ? "fixed top-[80px] md:top-[110px]" : "absolute"
        } right-6 left-6 ${
          showSearch ? " block " : "hidden"
        } transition-all duration-150 ease-in-out`}
      >
        <form>
          <input
            type="search"
            value={query}
            onChange={(e) => searchMovie(e)}
            placeholder="Search for a movie or tv show"
            onKeyDown={(e) => refreshDesabled(e)}
            className={`
            text-gray-800 appearance-none  bg-red-50 transition-all duration-150 ease-in-out
            outline-none w-full py-2 px-3 rounded`}
          />
        </form>
        <SearchedList
          list={searchList}
          query={query}
          isSearching={isSearching}
        />
      </div>
    </div>
  );
};

export default Search;
