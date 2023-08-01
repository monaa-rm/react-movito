import React, { useState } from "react";
import netflixSvg from "../assets/images/NetflixLogo.svg";
import SignUpScreen from "./SignUpScreen";

const LoginScreen = () => {
  const [signIn, setSignIn] = useState(false);

  const NotSignIn = () => {
    return (
      <div className="text-center mx-auto px-3 mt-[20%] flex space-y-2 flex-col justify-center">
        <h1 className="text-white text-lg sm:text-3xl font-bold">
          Unlimited films , TV programmes and more.
        </h1>
        <p className="text-white text-lg">
          Watch anywhere. Cancel at any time.
        </p>
        <span className="text-white text-sm font-light">
          Ready to watch? Enter your email to create or restart your membership.
        </span>
        <div>
          <form className="flex justify-center w-full ">
            <input
              type="text"
              className=" px-2 py-1 rounded-l-sm w-2/3 sm:w-1/3 outline-none"
            />
            <button
              type="button"
              onClick={() => setSignIn(true)}
              className="uppercase px-2 py-1 bg-red-700 shadow text-sm md:text-base rounded-r-sm font-bold text-white hover:bg-red-800 active:bg-red-900"
            >
              get started
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div
      style={{
        background: `url(https://www.logitheque.com/en/wp-content/uploads/sites/6/2019/07/netflix-image.jpg) center `,
      }}
      className={`w-screen h-screen bg-center bg-no-repeat`}
    >
      <div className="bg-black bg-opacity-60 w-full h-full z-20 relative">
        <div
          className={`flex justify-between transition-all duration-500 items-center px-5 py-1 }`}
        >
          <div className="w-24 md:w-32">
            <img src={netflixSvg} alt="" className="" />
          </div>
          <div className="">
            <button
              type="button"
              onClick={() => setSignIn(true)}
              className=" px-2 py-1 bg-red-700 shadow text-sm md:text-base rounded-sm font-bold text-white hover:bg-red-800 active:bg-red-900"
            >
              Sing in
            </button>
          </div>
        </div>
        {signIn ? <SignUpScreen /> : <NotSignIn />};
      </div>
    </div>
  );
};

export default LoginScreen;
