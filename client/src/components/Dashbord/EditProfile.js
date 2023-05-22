import React, { useState } from "react";
import Dnavbar from "./DNavbar";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import account from "../Appwrite/appwriteConfig";
import Context from "../Context/Createcontext";
function EditProfile() {
  const { email, name, smtp } = React.useContext(Context);
  const [host, setHost] = useState("");
  const [port, setPort] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");

  const navigate = useNavigate();
  const [newemail, setemail] = useState("");
  const [photo, setphoto] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      host: host,
      port: port,
      username: username,
      password: password,
      email: email,
    };

    fetch("http://localhost:5000/smtpConfig", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Allow-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())

      .then((res) => {
        console.log(res.code);
        if (res.code === "Success") {
          swal(
            "SMTP Configuration",
            "SMTP Configuration Successfully",
            "success"
          ).then(() => {
            window.location.href = "/profile";
          });
        } else {
          swal("SMTP Configuration", "SMTP Configuration Failed", "error").then(
            () => {
              window.location.href = "/profile";
            }
          );
        }
      });
  };

  return (
    <>
      <Dnavbar></Dnavbar>
      <div className="bg-white rounded-sm shadow-sm w-[70%] mx-auto">
        <div className="flex justify-center items-center my-24 pt-3">
          <h1 className="text-3xl text-black ">Edit Profile</h1>
        </div>
        <div className=" justify-center items-center flex w-[100%] mx-auto ">
          <form onSubmit={handleSubmit} className="w-4/5 mx-auto p-3">
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-password"
                >
                  uplode profile photo
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-password"
                  type="file"
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-password"
                >
                  Full Name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-password"
                  type="text"
                  placeholder="example : John Doe"
                  value={name}
                  onChange={(e) => {
                    setFname(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-password"
                >
                  Enter SMTP Email address
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-password"
                  type="email"
                  placeholder={email}
                  onChange={(e) => {
                    setemail(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-password"
                >
                  Enter SMTP Password
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-password"
                  type="text"
                  placeholder={smtp.password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-password"
                >
                  Enter SMTP Host
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-password"
                  type="text"
                  placeholder={smtp.host}
                  onChange={(e) => {
                    setHost(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-password"
                >
                  Enter SMTP Port
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-password"
                  type="text"
                  placeholder={smtp.port}
                  onChange={(e) => {
                    setPort(e.target.value);
                  }}
                />
              </div>
            </div>
            {/* button  */}
            <div className="flex flex-wrap -mx-3 mb-2">
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  type="sumbit"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditProfile;
