import React from 'react'
import spinnerr from "../assets/images/spinner.gif";

const Spinner = () => {
  return (
    <div className='h-screen bg-neutral-900 flex items-center justify-center'>
      <img src={spinnerr} alt='' />
    </div>
  )
}

export default Spinner
