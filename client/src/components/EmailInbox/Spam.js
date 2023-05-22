import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import DNavbar from "../Dashbord/DNavbar";
function Spam() {
  const [emails, setemails] = React.useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([
    {
      BookName: "",
      AuthorName: "",
      type: "",
      Price: "",
    },
  ]);

  useEffect(() => {
    try {
      fetch("http://localhost:3000/spamemails")
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setemails(res.emails);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  console.log(searchTerm);
  const handleSearch = async () => {
    try {
      const response = await fetch("http://localhost:3000/spamemails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ searchTerm }),
      });

      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error searching books:", error);
    }
  };

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
              <thead>
                <tr>
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
                      <tr key={index}>
                        <td className="px-2 py-2 sm:px-4">{email.BookName}</td>
                        <td className="px-2 py-2 sm:px-4">
                          {email.AuthorName}
                        </td>
                        <td className="px-2 py-2 sm:px-4">{email.type}</td>
                        <td className="px-2 py-2 sm:px-4">{email.Price}</td>
                        <td className="px-2 py-2 sm:px-4">
                          <button className="bg-green-500  -mr-12 hover:bg-green-700 text-white font-bold py-1 px-2 rounded text-sm sm:py-2 sm:px-4">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  : emails.map((email, index) => (
                      <tr key={index}>
                        <td className="px-2 py-2 sm:px-4">{email.BookName}</td>
                        <td className="px-2 py-2 sm:px-4">
                          {email.AuthorName}
                        </td>
                        <td className="px-2 py-2 sm:px-4">{email.type}</td>
                        <td className="px-2 py-2 sm:px-4">{email.Price}</td>
                        <td className="px-2 py-2 sm:px-4">
                          <button className="bg-green-500  -mr-12 hover:bg-green-700 text-white font-bold py-1 px-2 rounded text-sm sm:py-2 sm:px-4">
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

export default Spam;
