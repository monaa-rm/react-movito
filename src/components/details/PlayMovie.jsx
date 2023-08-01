import React from "react";


const PlayMovie = ({ keys, name }) => {
  return (
    <div className=" " >
      <h1 className=" text-lg  bg-neutral-900 text-white sm:text-xl pb-1 p-6">Trailers</h1>
      <div className=" py-8 grid lg:grid-cols-2  bg-neutral-900">
        {(keys && keys.length > 0)  ? keys.slice(0, Math.min(6, keys.length)).map((key,index) => (
          <div className="w-full p-8 bg-neutral-900  px-6" key={index}>
            
             <iframe
            className="w-full h-[250px] md:h-[300px] lg:h-[350px] block rounded-lg "
            src={`https://www.youtube.com/embed/${key}`}
            title={name}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>         
          </div>


        )) : (
          <p className="text-gray-100 px-8">There is no trailer.</p>
        )}
      </div>
    </div>
  );
};

export default PlayMovie;


