import React, { useState } from "react";
import "../../style.css";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import appwriteConfig from "../Appwrite/appwriteConfig";
import { useNavigate } from "react-router-dom";
import LeftBar from "./LeftBar";

function DNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  function toggle() {
    setIsOpen(!isOpen);
  }

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
            <Link to={"/"}>
              <span className="text-3xl text-indigo-600 mr-1 pt-2">
                <ion-icon name="logo-ionic"></ion-icon>
              </span>
              <span className="text-2xl text-indigo-600">CRM</span>
              <span className="text-2xl text-gray-800">Tool</span>
            </Link>
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
            className={`ml-48  md:flex   md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
              open ? "top-18 " : "top-[-490px]"
            }`}
          >
            <li className="  md:ml-8 text-md md:my-0 my-6">
              <Link
                to={"/"}
                className="text-gray-800 hover:text-gray-400 duration-300"
              >
                Home
              </Link>
            </li>

            <li className="  md:ml-8 text-md md:my-0 my-6">
              <Link
                to={"/profile"}
                className="text-gray-800 hover:text-gray-400 duration-300"
              >
                Profile
              </Link>
            </li>
            <li className="  md:ml-8 text-md md:my-0 my-6">
              <Link
                to={"/list"}
                className="text-gray-800 hover:text-gray-400 duration-300"
              >
                Create contact List
              </Link>
            </li>
            <li className="  md:ml-8 text-md md:my-0 my-6">
              <Link
                to={"/smtp"}
                className="text-gray-800 hover:text-gray-400 duration-300"
              >
                Configure SMTP
              </Link>
            </li>
            <li className="  md:ml-8 text-md md:my-0 my-6">
              <Link
                to={"/contactlist"}
                className="text-gray-800 hover:text-gray-400 duration-300"
              >
                See All list
              </Link>
            </li>
            <li className="  md:ml-8 text-md md:my-0 my-6">
              <div className="relative inline-block text-left">
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md  shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  id="options-menu"
                  aria-haspopup="true"
                  aria-expanded={isOpen}
                  onClick={toggle}
                >
                  Compose Mail
                  {/* Heroicon name: chevron-down */}
                  <svg
                    className="-mr-1 ml-2 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.707a1 1 0 0 1 0 1.414L9.586 13l-4.293 4.293a1 1 0 1 1-1.414-1.414L7.586 13l-3.293-3.293a1 1 0 0 1 0-1.414 1 1 0 0 1 1.414 0L10 10.586l-3.293-3.293a1 1 0 0 1 0-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                <div
                  className={`origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 ${
                    isOpen ? "block" : "hidden"
                  }`}
                  aria-labelledby="options-menu"
                  role="menu"
                  x-placement="bottom-end"
                >
                  <div className="py-1" role="none">
                    {/* Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" */}
                    <Link
                      to="/singlemail"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      Send mail
                    </Link>
                    <Link
                      to="/result"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      Send Results to student
                    </Link>

                    <Link
                      to="/birthday"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      Send mail for birthday wishes
                    </Link>
                    <Link
                      to="/attendance"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      Send mail for Attendance report
                    </Link>
                  </div>
                </div>
              </div>
            </li>
            <li className="  md:ml-8 text-md md:my-0 my-6">
              <Link
                to={"/feedback"}
                className="text-gray-800 hover:text-gray-400 duration-300"
              >
                Feedback
              </Link>
            </li>
          </ul>
          <div className="flex  md:ml-auto md:mr-0 mr-auto md:mt-0 mt-8  ">
            <LeftBar></LeftBar>
            <button
              onClick={handleLogout}
              type="button"
              class="bg-transparent inPhonemode hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default DNavbar;
