import React, { useEffect } from "react";
import DNavbar from "./DNavbar";
import Context from "../Context/Createcontext";
import { useContext } from "react";
import swal from "sweetalert";
function Contactlist() {
  const { email, contactlist, setContactlist } = useContext(Context);

  const deleteContactlist = (clistname) => {
    fetch(`http://localhost:5000/deleteclist`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ clist: clistname, email: email }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.code === "Success") {
          swal(
            "Deleted!",
            "Your contact list has been deleted!",
            "success"
          ).then(() => {
            window.location.href = "/contactlist";
          });
          setContactlist(data.data);
        } else {
          swal(
            "Error!",
            "Your contact list has not been deleted!",
            "error"
          ).then(() => {
            window.location.href = "/contactlist";
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(contactlist);
  return (
    <>
      <DNavbar />
      <div className=" my-24  justify-center items-center w-10/12 mx-auto   ">
        <div className="  items-center">
          <h1 className=" top-3 relative my-3 text-center ">
            <span className=" text-primary text-4xl">Contact list</span>
          </h1>
        </div>
        <div className=" w-[80%] text-center items-center justify-center mx-auto my-12">
          <table className="w-full text-sm text-left text-gray-200  justify-center dark:text-gray-400">
            <thead className="text-xs items-center justify-center text-white uppercase bg-gray-50 dark:bg-gray-700 dark:text-white">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name of contact list
                </th>
                <th scope="col" className="px-6 py-3">
                  Date and Time of creation
                </th>
                <th scope="col" className="px-6 py-3">
                  Delete contact list
                </th>
              </tr>
            </thead>
            <tbody>
              {
                // eslint-disable-next-line array-callback-return
                contactlist.map((item, i) => {
                  return (
                    <tr
                      key={item}
                      className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-200">
                        {item[0]}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {item[1]}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                        <button
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                          onClick={() => {
                            deleteContactlist(item[0]);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Contactlist;
