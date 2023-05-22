import React, { useState } from "react";
import DNavbar from "./DNavbar";
import swal from "sweetalert";
import account from "../Appwrite/appwriteConfig";
import { useNavigate } from "react-router-dom";
function Smtpconfig() {
  const [host, setHost] = useState("");
  const [port, setPort] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  React.useEffect(() => {
    account
      .get()
      .then((response) => {
        setemail(response.email);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
            window.location.href = "/smtp";
          });
        } else {
          swal("SMTP Configuration", "SMTP Configuration Failed", "error").then(
            () => {
              window.location.href = "/smtp";
            }
          );
        }
      });
  };

  return (
    <div>
      <DNavbar></DNavbar>
      <div>
        <div class="container w-[90%] md:w-4/5 mx-auto my-24 bg-white shadow-lg ">
          <div className="container w-full  p-3 md:p-6">
            <h1 className="text-2xl pt-2 text-center">SMTP Configuration</h1>
          </div>
          <form onSubmit={handleSubmit} className="w-4/5 mx-auto p-3">
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full px-3">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-password"
                >
                  Enter SMTP Host
                </label>
                <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-password"
                  type="text"
                  placeholder="example : smtp.gmail.com"
                  required
                  onChange={(e) => {
                    setHost(e.target.value);
                  }}
                />
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full px-3">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-password"
                >
                  Enter SMTP Port
                </label>
                <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-password"
                  type="text"
                  placeholder="example : 587"
                  required
                  onChange={(e) => {
                    setPort(e.target.value);
                  }}
                />
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full px-3">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-password"
                >
                  Enter SMTP Email address
                </label>
                <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-password"
                  type="email"
                  placeholder="example :name@gmai.com"
                  required
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full px-3">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-password"
                >
                  Enter SMTP Password
                </label>
                <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-password"
                  type="password"
                  placeholder="****"
                  required
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
            </div>
            {/* button  */}
            <div class="flex flex-wrap -mx-3 mb-2">
              <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <button
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  type="sumbit"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Smtpconfig;
