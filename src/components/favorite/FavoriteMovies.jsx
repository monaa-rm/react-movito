import FavMovie from "./FavMovie";

const FavoriteMovies = ({ movieIds }) => {



  return (
    <div className="text-white ml-1 px-6 py-3 ">
      <h2 className="font-bold sm:text-lg pb-1">Favorite movies</h2>
      <div className="h-44 overflow-y-hidden overflow-x-scroll flex items-center scroll whitespace-nowrap scroll-smooth">
        {movieIds.map(
          (movie, index) =>
            <FavMovie id={movie} key={index} />
        )}
      </div>
    </div>
  );
};

export default FavoriteMovies;
