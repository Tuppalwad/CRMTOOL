import React, { useState } from "react";
import DNavbar from "./DNavbar";
import { FaCamera } from "react-icons/fa";
import Context from "../Context/Createcontext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const { email, name, smtp, contactlist, userImage } = useContext(Context);
  const [binaryimg, setBinaryimg] = useState(null);

  const imageupload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertTobase64(file);
    console.log(base64);
    setBinaryimg(base64);
    fetch("http://localhost:5000/uploadImage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Allow-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ email: email, image: base64 }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.status === "success") {
          window.location.reload();
        }
      });
  };
  function convertTobase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }
  console.log(userImage);

  if (smtp.host === undefined) {
    return (
      <>
        <DNavbar />
        {/* box for show the profile is not set up yet */}
        <div
          className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Hey {name}!</strong>
          <span className="block sm:inline">
            {" "}
            Your profile is not set up yet.
          </span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg
              className="fill-current h-6 w-6 text-yellow-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path
                d="M14.348 14.849a1 1 0 0 1-1.414 0L10 11.414l-2.93 2.93a1 1 0 1 1-1.414-1.414l2.93-2.93-2.93-2.93a1
              1 0 1 1 1.414-1.414l2.93 2.93 2.93-2.93a1 1 0 1 1 1.414
              1.414l-2.93 2.93 2.93 2.93a1 1 0 0 1 0 1.414z"
              ></path>
            </svg>
          </span>
        </div>

        <div className="bg-white max-w-2xl my-24 shadow overflow-hidden sm:rounded-lg w-full mx-auto items-center justify-center ">
          <div className="rounded-t-lg  h-48 overflow-hidden">
            <img
              className="object-cover object-top  h-40 w-full"
              src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
              alt="Mountain"
            />
          </div>
          <div className="mx-auto w-32 h-32 relative mb-3 -mt-16 border-4 border-white rounded-full overflow-hidden">
            {userImage ? (
              <img
                src={userImage}
                className="object-cover object-center h-32"
                alt="Profile"
              />
            ) : (
              <div className=" justify-center items-center  relative mt-12 ml-12">
                <label htmlFor="image-upload">
                  <FaCamera size={30} />
                </label>
                <input
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  onChange={imageupload}
                  className="hidden"
                />
              </div>
            )}
          </div>

          {/* add edit button icon here  */}
          <div className="flex justify-center items-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={() => {
                navigate("/editprofile");
              }}
            >
              Edit Profile
            </button>
          </div>

          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Full name</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {name}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  User Email{" "}
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {email}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Host id</dt>
                <dt className="text-sm font-medium text-gray-900">
                  {smtp.host}
                </dt>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Host Name</dt>
                <dt className="text-sm font-medium text-gray-900">
                  {smtp.username}
                </dt>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Port Number
                </dt>
                <dt className="text-sm font-medium text-gray-900">
                  {smtp.port}
                </dt>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Password</dt>
                <dt className="text-sm font-medium text-gray-900">
                  {smtp.password}
                </dt>
              </div>
            </dl>
          </div>
        </div>
      </>
    );
  }
  if (contactlist.length === 0) {
    return (
      <>
        return (
        <div>
          <DNavbar />
          <div
            className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Hey {name}!</strong>
            <span className="block sm:inline">
              {" "}
              You have not added any contact yet.
            </span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
              <svg
                className="fill-current h-6 w-6 text-yellow-500"
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <title>Close</title>
                <path
                  d="M14.348 14.849a1 1 0 0 1-1.414 0L10 11.414l-2.93 2.93a1 1 0 1 1-1.414-1.414l2.93-2.93-2.93-2.93a1
              1 0 1 1 1.414-1.414l2.93 2.93 2.93-2.93a1 1 0 1 1 1.414
              1.414l-2.93 2.93 2.93 2.93a1 1 0 0 1 0 1.414z"
                ></path>
              </svg>
            </span>
          </div>

          <div className="bg-white max-w-2xl my-24 shadow overflow-hidden sm:rounded-lg w-full mx-auto items-center justify-center ">
            <div className="rounded-t-lg  h-48 overflow-hidden">
              <img
                className="object-cover object-top  h-40 w-full"
                src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
                alt="Mountain"
              />
            </div>
            <div className="mx-auto w-32 h-32 relative mb-3 -mt-16 border-4 border-white rounded-full overflow-hidden">
              {userImage ? (
                <img
                  src={userImage}
                  className="object-cover object-center h-32"
                  alt="Profile"
                />
              ) : (
                <div className=" justify-center items-center  relative mt-12 ml-12">
                  <label htmlFor="image-upload">
                    <FaCamera size={30} />
                  </label>
                  <input
                    type="file"
                    id="image-upload"
                    accept="image/*"
                    onChange={imageupload}
                    className="hidden"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-center items-center">
              <button
                className="bg-blue-500 mb-3 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                onClick={() => {
                  navigate("/editprofile");
                }}
              >
                Edit Profile
              </button>
            </div>
            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Full name
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {name}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    User Email{" "}
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {email}
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Host id</dt>
                  <dt className="text-sm font-medium text-gray-900">
                    {smtp.host}
                  </dt>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Host Name
                  </dt>
                  <dt className="text-sm font-medium text-gray-900">
                    {smtp.username}
                  </dt>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Port Number
                  </dt>
                  <dt className="text-sm font-medium text-gray-900">
                    {smtp.port}
                  </dt>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Password
                  </dt>
                  <dt className="text-sm font-medium text-gray-900">
                    {smtp.password}
                  </dt>
                </div>
              </dl>
            </div>
          </div>
        </div>
        );
      </>
    );
  }

  return (
    <>
      <div>
        <DNavbar />
        <div className="bg-white max-w-2xl my-24 shadow overflow-hidden sm:rounded-lg w-full mx-auto items-center justify-center ">
          <div className="rounded-t-lg  h-48 overflow-hidden">
            <img
              className="object-cover object-top  h-40 w-full"
              src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
              alt="Mountain"
            />
          </div>

          <div className="mx-auto w-32 h-32 relative mb-3 -mt-16 border-4 border-white rounded-full overflow-hidden">
            {userImage ? (
              <img
                src={userImage}
                className="object-cover object-center h-32"
                alt="Profile"
              />
            ) : (
              <div className=" justify-center items-center  relative mt-12 ml-12">
                <label htmlFor="image-upload">
                  <FaCamera size={30} />
                </label>
                <input
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  onChange={imageupload}
                  className="hidden"
                />
              </div>
            )}
          </div>

          <div className="flex justify-center items-center">
            <button
              className="bg-blue-500 mb-3 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={() => {
                navigate("/editprofile");
              }}
            >
              Edit Profile
            </button>
          </div>

          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Full name</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {name}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  User Email{" "}
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {email}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Host id</dt>
                <dt className="text-sm font-medium text-gray-900">
                  {smtp.host}
                </dt>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Host Name</dt>
                <dt className="text-sm font-medium text-gray-900">
                  {smtp.username}
                </dt>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Port Number
                </dt>
                <dt className="text-sm font-medium text-gray-900">
                  {smtp.port}
                </dt>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Password</dt>
                <dt className="text-sm font-medium text-gray-900">
                  {smtp.password}
                </dt>
              </div>
            </dl>
          </div>
        </div>
      </div>
      );
    </>
  );
}

export default Profile;
