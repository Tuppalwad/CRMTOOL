/* eslint-disable no-whitespace-before-property */
import React, { useContext, useEffect, useState } from "react";
import DNavbar from "../Dashbord/DNavbar";
import Context from "../Context/Createcontext";
import swal from "sweetalert";
function Inbox() {
  const { attendencemails, email } = useContext(Context);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    try {
      fetch("http://localhost:5000/serchemails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Allow-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ text: searchTerm, email: email }),
      })
        .then((res) => res.json())
        .then((res) => {
          setSearchResults(res.email);
        });
    } catch (error) {
      console.log("error");
    }
  };

  const deleteemail = (id) => {
    try {
      fetch("http://localhost:5000/deleteusermail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Allow-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ id: id, email: email }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.status === "success") {
            swal("Good job!", "Email Deleted!", "success");
            window.location.reload();
          } else {
            swal("Error!", "Email not Deleted!", "error");
          }
        });
    } catch (error) {
      console.log("error");
    }
  };

  // // window.location.reload();
  return (
    <div>
      <DNavbar />
      <div className="flex my-12 justify-center">
        <div className="w-full sm:w-11/12 lg:w-3/4">
          <div className=" flex my-12 justify-start items-center">
            <div className="w-1/4">
              <input
                type="text"
                className="border border-gray-300 rounded px-4 py-2 w-full"
                placeholder="Search books"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="ml-3">
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead className=" justify-start">
                <tr className=" justify-start">
                  <th className="px-4 py-2 bg-gray-200">Subject</th>
                  <th className="px-4 py-2 bg-gray-200">Message</th>
                  <th className="px-4 py-2 bg-gray-200">Time</th>
                  <th className="px-4 py-2 bg-gray-200">catagory</th>
                  <th className="px-4 py-2 bg-gray-200">Delete</th>
                </tr>
              </thead>
              <tbody>
                {searchTerm.length > 0
                  ? searchResults.map((email, index) => (
                      <tr className=" justify-center items-center" key={index}>
                        <td className="px-2 py-2 sm:px-4  ">{email.subject}</td>
                        <td className="px-2 py-2 sm:px-4">{email.body}</td>
                        <td className="px-2 py-2 sm:px-4">{email.date}</td>
                        <td className="px-2 py-2 sm:px-4">{email.type}</td>

                        <td className="px-2 py-2 sm:px-4">
                          <button className="bg-green-500  -mr-12 hover:bg-green-700 text-white font-bold py-1 px-2 rounded text-sm sm:py-2 sm:px-4">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  : attendencemails.map((email, index) => (
                      <tr key={index}>
                        <td className="px-2 py-2 sm:px-4">{email.subject}</td>
                        <td className="px-2 py-2 sm:px-4">{email.body}</td>
                        <td className="px-2 py-2 sm:px-4">{email.date}</td>
                        <td className="px-2 py-2 sm:px-4">{email.type}</td>

                        <td className="px-2 py-2 sm:px-4">
                          <button
                            onClick={() => {
                              deleteemail(email._id);
                            }}
                            className="bg-green-500  -mr-12 hover:bg-green-700 text-white font-bold py-1 px-2 rounded text-sm sm:py-2 sm:px-4"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inbox;
