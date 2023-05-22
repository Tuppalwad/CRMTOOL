import React, { useContext, useEffect, useState } from "react";
import DNavbar from "../DNavbar";
import Context from "../../Context/Createcontext";

// import Swal from "sweetalert2";
function ComposeBox() {
  const { list, listofsendmail } = useContext(Context);
  return (
    <>
      <DNavbar></DNavbar>
      <div className="flex my-24 flex-col items-center justify-center">
        <h1 className="text-3xl  font-bold text-black dark:text-black">
          Birthday
        </h1>
        <p className="text-gray-700 dark:text-black">
          List of students whose birthday is today
        </p>
      </div>

      <div className="  justify-center items-center w-10/12 mx-auto   ">
        <div className="shadow-md sm:rounded-lg">
          <table className="w-full  text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Roll No.
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Class
                </th>
                <th scope="col" className="px-6 py-3">
                  Branch
                </th>
                <th scope="col" className="px-6 py-3">
                  Year
                </th>
                <th scope="col" className="px-6 py-3">
                  Date of Birth
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {list.map((item, i) => {
                return (
                  <tr
                    key={item}
                    className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-200">
                      {item[0]}
                    </td>
                    <td className="px-6 py-4 text-sm text-white dark:text-white">
                      {item[1]}
                    </td>
                    <td className="px-6 py-4 text-sm text-white dark:text-white">
                      {item[2]}
                    </td>
                    <td className="px-6 py-4 text-sm text-white dark:text-white">
                      {item[3]}
                    </td>
                    <td className="px-6 py-4 text-sm text-white dark:text-white">
                      {item[4]}
                    </td>
                    <td className="px-6 py-4 text-sm text-white dark:text-white">
                      {item[5].split("T")[0]}
                    </td>
                    <td className="px-6 py-4 text-sm text-white dark:text-white">
                      {listofsendmail.includes(item[6]) ? (
                        <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
                          Sent
                        </span>
                      ) : (
                        <span className="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-full dark:bg-red-700 dark:text-red-100">
                          Not Sent
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default ComposeBox;
