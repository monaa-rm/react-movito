import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useRef, useState } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import Spinner from "../utils/Spinner";

const SignUpScreen = () => {
  const [registered, setRegistered] = useState(false);
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const register = (e) => {
    e.preventDefault();
    setLoading(true);
    createUserWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then((userCredential) => {
        console.log(userCredential);
        setRegistered(true);
      })
      .catch((error) => {
        alert(error.message);
      });
    setLoading(false);
  };

  const signIn = (e) => {
    e.preventDefault();
    setLoading(true);
    signInWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then((userCredential) => {
        navigate("/");
      })
      .catch((error) => {
        alert(error.message);
      });
    setLoading(false);
  };
  if (loading) {
    return <Spinner />;
  } else {
    return (
      <>
        <form
          className="text-center mx-8 sm:mx-auto rounded mt-[20%] sm:mt-[8%] flex  flex-col justify-center max-w-sm
       bg-black bg-opacity-80 py-5 px-5 sm:py-10 sm:px-16"
        >
          <h1 className="text-white text-xl sm:text-2xl  font-bold text-start">
            Sign In
          </h1>
          <input
            type="email"
            ref={emailRef}
            placeholder="Email"
            className="h-10 rounded p-2 outline-none mt-2"
          />
          <input
            ref={passwordRef}
            type="password"
            placeholder="Password"
            className="h-10 rounded p-2 outline-none mt-2"
          />
          <button
            onClick={signIn}
            type="submit"
            className="text-white font-bold w-full bg-red-700 h-10 rounded mt-5 hover:bg-red-800 active:bg-red-900"
          >
            Sign in
          </button>
          {registered ? null : (
            <h4 className="text-gray-400 text-start mt-3 text-xs sm:text-sm">
              New to Netflix ?{" "}
              <span
                onClick={register}
                className="text-white cursor-pointer hover:underline"
              >
                {" "}
                Sign up now.
              </span>
            </h4>
          )}
        </form>
      </>
    );
  }
};

export default SignUpScreen;
