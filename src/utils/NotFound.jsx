import React from 'react'
import error404 from "../assets/images/error-404.png";
import { useNavigate } from 'react-router-dom';
const NotFound = () => {
    const navigate = useNavigate();
  return (
    <div className='text-center h-screen mt-10 sm:mt-0 bg-neutral-900'>
      <img alt='' className='mx-auto w-1/3' src={error404} />
      <h1 className='text-red-600 my-3 font-bold text-3xl'>Page Not Found!</h1>
      <h1 onClick={() => navigate("/")} className='text-slate-400 font-thin text-xl  hover:underline hover:text-red-400 cursor-pointer'>Go To Home</h1>

    </div>
  )
}

export default NotFound
