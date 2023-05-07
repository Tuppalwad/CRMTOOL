import React, { useState } from "react";
import "../../style.css";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import appwriteConfig from "../Appwrite/appwriteConfig";
import { useNavigate } from "react-router-dom";
import LeftBar from "./LeftBar";

function Navbar() {
  let Links = [
    { name: "Home", link: "/" },
    { name: "Compose", link: "/compose" },
    { name: "Create List", link: "/list" },
    { name: "Profile", link: "/profile" },
    { name: "Cofigure SMTP", link: "/smtp" },
    { name: "", link: "/contact" },
  ];
  let [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await appwriteConfig.deleteSession("current");

      navigate("/login");
    } catch (error) {
      swal("Error", error.message, "error");
    }
  };

  return (
    <>
      <div className="shadow-md w-full fixed top-0 left-0  ">
        <div className="md:flex items-center  bg-white py-3 md:px-10 px-7 navbarhight">
          <div
            className=" font-bold text-2xl cursor-pointer flex items-center font-[Poppins] 
      text-gray-800 "
          >
            <span className="text-3xl text-indigo-600 mr-1 pt-2">
              <ion-icon name="logo-ionic"></ion-icon>
            </span>
            <span className="text-2xl text-indigo-600">CRM</span>
            <span className="text-2xl text-gray-800">Tool</span>
          </div>

          <div
            onClick={() => setOpen(!open)}
            className="    text-3xl absolute right-8 top-6  cursor-pointer md:hidden"
          >
            <ion-icon name={open ? "close" : "menu"}></ion-icon>
          </div>
          <div className="md:hidden w-24 h-10 absolute right-12 top-7 cursor-pointer">
            {/* user icon here */}

            <button
              onClick={handleLogout}
              class="bg-transparent  hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 -my-2 px-2 border border-blue-500 hover:border-transparent rounded"
            >
              Log out
            </button>
          </div>

          <ul
            className={`  ml-48  md:flex   md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
              open ? "top-18 " : "top-[-490px]"
            }`}
          >
            {Links.map((link) => (
              <li key={link.name} className="  md:ml-8 text-md md:my-0 my-6">
                <Link
                  to={link.link}
                  className="text-gray-800 hover:text-gray-400 duration-300"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex  md:ml-auto md:mr-0 mr-auto md:mt-0 mt-8  ">
            <LeftBar></LeftBar>
            <button
              onClick={handleLogout}
              type="button"
              class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
