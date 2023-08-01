import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const user = useSelector(state => selectUser(state))

  return (
    <div
      style={{
        backgroundImage: "linear-gradient(180deg, #171717,#490707,#af0303)",
      }}
      className="h-24 pb-2 flex items-end justify-center"
    >
      {user && (
        <button type="button" onClick={() => navigate("/profile")} className="bg-red-50 hover:bg-red-200 rounded py-2 px-5 text-red-600 font-bold text-xl">
          Hi {user.email}
        </button>
      ) }
    </div>
  );
};

export default Footer;
