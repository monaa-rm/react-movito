import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const ErrorPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div className='text-center flex flex-col items-center justify-center h-screen mt-10 sm:mt-0 bg-neutral-900'>
     <h2 className='text-red-600 my-3 font-bold text-xl'> Something went wrong. Please check your internet connection.</h2>
     <h1 onClick={() => window.location.reload()} className='text-slate-400 font-thin text-xl  hover:underline hover:text-red-400 cursor-pointer'>try again</h1>

    </div>
  )
}

export default ErrorPage
