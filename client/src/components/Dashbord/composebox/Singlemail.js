import React, { useState } from "react";
import DNavbar from "../DNavbar";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import swal from "sweetalert";

import { useContext } from "react";
import Context from "../../Context/Createcontext";
// import Swal from "sweetalert2";
function ComposeBox() {
  const [to, setTo] = useState("");
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [type, setType] = useState("");
  const { smtp, email, contactlist } = useContext(Context);
  console.log("smtp");
  console.log(type);

  let txt;
  function clickHandler1() {
    txt = document.getElementById("btn1").innerText;
    setType(txt);
  }

  const handalsubmit = (e) => {
    e.preventDefault();
    const data = {
      to: to,
      subject: subject,
      message: message,
      host: smtp.host,
      port: smtp.port,
      username: smtp.username,
      password: smtp.password,
      email: email,
      spam: "false",
    };

    fetch("http://localhost:5000/checkSpam", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("spma check");
        console.log(res);
        if (res.status === 400) {
          try {
            fetch("http://localhost:5000/sendsinglmail", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
              },
              body: JSON.stringify(data),
            })
              .then((res) => res.json())

              .then((res) => {
                console.log(res);
                if (res.code === "Success") {
                  swal("Compose", "Compose Successfully", "success");
                  e.target.reset();
                } else {
                  swal("Compose", "Compose Failed", "error");
                  e.target.reset();
                }
              });
          } catch (err) {
            console.log(err);
            swal("Compose", "Compose Failed", "error");
          }
        } else if (res.status === 200) {
          swal({
            title: "Spam Detected !",
            text: "Are you sure you want to send this email?",
            icon: "warning",
            buttons: ["Cancel", "Send"],
            dangerMode: true,
          }).then((confirmed) => {
            console.log(confirmed);
            if (confirmed) {
              data.spam = "true";
              try {
                fetch("http://localhost:5000/sendsinglmail", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                  },
                  body: JSON.stringify(data),
                })
                  .then((res) => res.json())
                  .then((res) => {
                    console.log(data);
                    console.log("kkkkkkk");
                    console.log(res);
                    if (res.code === "Success") {
                      swal("Compose", "Compose Successfully", "success");

                      e.target.reset();
                    } else {
                      swal("Compose", "Compose Failed", "error");
                      e.target.reset();
                    }
                  });
              } catch (err) {
                console.log(err);
                swal("Compose", "Compose Failed", "error");
              }
            } else {
              swal("Compose", "Compose Failed", "error");
            }
          });
        } else {
          swal("Compose", "Compose Failed", "error");
        }
      });
    e.target.reset();
  };

  return (
    <>
      <DNavbar></DNavbar>
      <div className="container justify-center items-center w-[65%] md:w-3/5 mx-auto my-16 bg-white shadow-lg p-6">
        <div>
          <h1 className="text-2xl pt-2 text-center">Send Email to Students</h1>
        </div>
        <form
          onSubmit={handalsubmit}
          className=" justify-center text-black items-center w-full mx-auto my-3 md:pl-48  "
        >
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="  sm:col-span-4">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    To
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset  bg-white focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="email"
                        name=""
                        id="username"
                        autoComplete="email"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1  text-gray-900 placeholder:text-gray-800 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder=" Enter your Email"
                        onChange={(e) => setTo(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Subject
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        name=""
                        id="username"
                        autoComplete="email"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1  text-gray-900 placeholder:text-gray-800 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder=" Enter the subject "
                        onChange={(e) => setSubject(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Message
                  </label>
                  <div className="App">
                    <CKEditor
                      editor={ClassicEditor}
                      data="<p>Hello....</p>"
                      onReady={(editor) => {
                        console.log("Editor is ready to use!", editor);
                      }}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setMessage(data);
                      }}
                    />
                  </div>
                </div>
                {/* choose the differetn file of list of email  */}
              </div>
              {/* textare hear  */}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-start gap-x-6">
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              id="btn1"
              value="cc"
              onClick={clickHandler1}
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ComposeBox;
