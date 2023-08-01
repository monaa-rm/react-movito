import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GiFilmSpool } from "react-icons/gi";

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const navigate = useNavigate();
  const transformationNavbar = () => {
    if (window.scrollY > 100) {
      setShowNavbar(true);
    } else {
      setShowNavbar(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", transformationNavbar);

    return () => window.removeEventListener("scroll", transformationNavbar);
  }, [showNavbar]);

  return (
    <>
      <div className="w-full fixed z-10">
        <div
          className={`flex justify-between transition-all duration-500 items-center px-5 py-4 ${
            showNavbar && "bg-zinc-950"
          }`}
        >
          <div className="w-24 md:w-32 flex items-center cursor-pointer" onClick={() => navigate("/")}>
            <h1 className="font-extrabold text-3xl text-red-600">MOVITO</h1>
            <div>
            <GiFilmSpool className="text-red-600 flex fill-red-600 text-3xl" />

            </div>


            
          </div>
          <div className="flex items-center space-x-3">
            <div className=" w-10 h-10">
              <img
                onClick={() => navigate("/profile")}
                src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                alt=""
                className="cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
