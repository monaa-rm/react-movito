import React, { useEffect, useState } from 'react'
import { useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { API_KEY } from '../../requests';
import axios from 'axios';
import DefaultImage from "../../assets/images/user.png";

const FavMovie = ({id}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  const [images, setImages] = useState("");
  const base_url = "https://image.tmdb.org/t/p/original";

    const fetchData = async () => {

            const response = await axios.get(
              `https://api.themoviedb.org/3/movie/${id}/images?api_key=${API_KEY}`
            );
            setImages(response.data.posters[0].file_path)
            return response.data;
      };
useEffect(()=>{
    fetchData()
},[id])
  return (
    <>
              <img
                onClick={() => {
                  navigate(`/movie/${movie.id}`);
                }}
                src={`${base_url}${images}
                 
                ` || DefaultImage}
                className={` object-contain cursor-pointer px-1 hover:scale-105 transition-all
                 duration-200 ease-in-out max-h-40  `}
                alt=""
              />
    </>
  )
}

export default FavMovie
