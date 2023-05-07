import React, { useEffect } from "react";
import Context from "./Createcontext";
import account from "../Appwrite/appwriteConfig";

function Dataprovider({ children }) {
  const [islogin, setislogin] = React.useState(false);
  const [email, setemail] = React.useState("");
  const [name, setname] = React.useState("");
  const [photo, setphoto] = React.useState("");
  const [phone, setMno] = React.useState("");
  const [contactlist, setcontactlist] = React.useState([]);
  const [smtp, setsmtp] = React.useState({});
  useEffect(() => {
    account
      .get()
      .then((response) => {
        const emailforgetdata = response.email;
        setemail(response.email);
        setname(response.name);
        setphoto(response.photoUrl);
        setMno(response.number);
        fetch("http://localhost:5000/getContactList", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Allow-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({ email: emailforgetdata }),
        })
          .then((res) => res.json())
          .then((res) => {
            console.log(res.code);
            if (res.code === "Success") {
              setcontactlist(res.data);
            }
          });
        fetch("http://localhost:5000/getSmtpConfig", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",

            "Allow-Control-Allow-Origin": "*",
          },

          body: JSON.stringify({ email: emailforgetdata }),
        })
          .then((res) => res.json())
          .then((res) => {
            console.log(res.code);
            if (res.code === "Success") {
              setsmtp(res.data);
            }
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Context.Provider
        value={{
          islogin,
          setislogin,
          email,
          name,
          photo,
          phone,
          contactlist,
          setcontactlist,
          smtp,
          setsmtp,
        }}
      >
        {children}
      </Context.Provider>
    </>
  );
}

export default Dataprovider;
