import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { Helmet } from "react-helmet-async";

const ProfileScreen = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);
  return (
    <div className="w-screen h-screen bg-[#111]">
      <Helmet>
        <title>{`MOVITO -` + user?.email}</title>
      </Helmet>
      <Navbar />
      <Navbar />
      <div className="mx-auto pt-40 max-w-lg ">
        <h1 className=" text-4xl py-3 text-white">Edit Profile</h1>
        <div className="flex space-x-5">
          <div className="w-24">
            <img
              alt=""
              src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            />
          </div>
          <div className="w-full">
            <h1 className="bg-gray-500 text-white w-full p-2 mb-2 rounded-sm">
              {user?.email}
            </h1>
            <h2 className=" text-white mb-2 font-bold border-b border-gray-900">
              Plans
            </h2>
            <button
              onClick={() => auth.signOut()}
              type="button"
              className="bg-red-700 w-full py-1 outline-none rounded-sm text-white  hover:bg-red-800 active:bg-red-900"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
