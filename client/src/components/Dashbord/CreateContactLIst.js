import React, { useEffect } from "react";
import DNavbar from "./DNavbar";
import readXlsxFile from "read-excel-file";
import swal from "sweetalert";
import account from "../Appwrite/appwriteConfig";
function CreateContactLIst() {
  const [rows, setrows] = React.useState([]);
  const [email, setemail] = React.useState("");
  const [filename, setfilename] = React.useState("");

  const readExcel = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    readXlsxFile(file).then((rows) => {
      setrows(rows);
    });
  };

  useEffect(() => {
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
      email: email,
      rows: rows,
      filename: filename,
    };
    fetch("http://localhost:5000/contactList", {
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
          swal("Contact List", "Contact List Successfully", "success").then(
            () => {
              window.location.href = "/list";
            }
          );
        } else {
          swal("Contact List", "Contact List Failed", "error").then(() => {
            window.location.href = "/list";
          });
        }
      });
    e.target.reset();
  };

  return (
    <>
      <DNavbar></DNavbar>
      <div className=" container w-[90%] md:w-4/5 mx-auto my-24 bg-white shadow-lg ">
        <div>
          <h1 className="text-2xl pt-2 text-center">Create Contact List</h1>
        </div>
        <div className="container w-full  p-3 md:p-6">
          <form onSubmit={handleSubmit}>
            <div>
              <label
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-dark-100"
                for="multiple_files"
              >
                Contact List Name
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="File Name"
                required
                onChange={(e) => setfilename(e.target.value)}
              />
            </div>
            <div>
              <label
                class="block my-3 mb-2 text-sm font-medium text-gray-900 dark:text-dark-100"
                for="multiple_files"
              >
                Upload multiple files
              </label>
              <input
                class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none   py-2 pl-2"
                id="multiple_files"
                type="file"
                multiple
                onChange={readExcel}
              />
            </div>
            <button class="bg-blue-500 my-3 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Create Contact List
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateContactLIst;
