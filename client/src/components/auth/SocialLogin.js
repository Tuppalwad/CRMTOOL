/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import account from "../Appwrite/appwriteConfig";

import "./style.css";
import { Link } from "react-router-dom";
export default function SocialLogin() {
  const GoogleLogin = (e) => {
    e.preventDefault();
    console.log("Google Login");
    try {
      account.createOAuth2Session(
        "google",
        "http://localhost:3000/dashboard",
        "http://localhost:3000/login"
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex w-full">
        <button
          className="my-3 bg-transparent w-full hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          onClick={(e) => GoogleLogin(e)}
        >
          <ion-icon className="my-2" name="logo-google"></ion-icon>
          <span className="ml-2">Login with Google</span>
        </button>
      </div>
    </>
  );
}
