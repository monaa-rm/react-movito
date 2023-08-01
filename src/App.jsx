import { useEffect, useMemo, useRef, useState } from "react";
import Banner from "./components/Banner";
import Navbar from "./components/Navbar";
import Row from "./components/Row";
import requests from "./requests";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";
import { useNavigate } from "react-router-dom";
import { RiSearch2Line } from "react-icons/ri";

import Search from "./components/search/Search";
import Spinner from "./utils/Spinner";
import FavoriteMovies from "./components/favorite/FavoriteMovies";
import { fetchFavoriteMovieId, toggleFavorite } from "./features/movieSlice";
import { Helmet } from "react-helmet-async";
const App = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [loading, setLoading] = useState(false);
  const favorites = useSelector((state) => state.movies.favorite);
  const user = useSelector((state) => selectUser(state));

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    dispatch(fetchFavoriteMovieId());
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          login({
            uid: user.uid,
            email: user.email,
          })
        );
      } else {
        navigate("/login");
        dispatch(logout());
      }
      return unsubscribe;
    });
    setLoading(false);
  }, []);


  
  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div className="bg-neutral-900 relative">
        <Helmet>
          <title>MOVITO- Discover and Explore Movies</title>
        </Helmet>
        <RiSearch2Line
          onClick={(e) => {
            e.stopPropagation();
            setShowSearch(true);
          }}
          className=" text-3xl fixed right-[70px] top-[20px] md:top-[20px] z-50 cursor-pointer text-white opacity-80 hover:opacity-100 transition-all duration-150 ease-in-out active:text-blue-200 "
        />

        <Navbar />
        <Banner />
        <Search showSearch={showSearch} setShowSearch={setShowSearch} />
        <Row
          title="netflix original"
          isLargeRow
          mediaType=""
          fetchUrl={requests.fetchNetflixOriginals}
        />
        <Row title="trend now" isLargeRow fetchUrl={requests.fetchTrending} />
        <Row title="Top Rated" isLargeRow fetchUrl={requests.fetchTopRated} />
        <Row
          title="Action Movies"
          isLargeRow
          fetchUrl={requests.fetchActionMovies}
        />
        <Row
          title="Comedy Movies"
          isLargeRow
          fetchUrl={requests.fetchComedyMovies}
        />
        <Row
          title="Horror Movies"
          isLargeRow
          fetchUrl={requests.fetchHorrorMovies}
        />
        <Row
          title="Romance Movies"
          isLargeRow
          fetchUrl={requests.fetchRomanceMovies}
        />
        <Row
          title="Documentaries"
          isLargeRow
          fetchUrl={requests.fetchDocumentaries}
        />
        {favorites && <FavoriteMovies movieIds={favorites} />}
      </div>
    );
  }
};

export default App;
