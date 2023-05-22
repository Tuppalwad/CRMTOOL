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
  const [contactlistdate, setcontactlistdate] = React.useState([]);
  const [list, setlist] = React.useState([]);
  const [listofsendmail, setlistofsendmail] = React.useState([]);
  const [listofmails, setlistofmails] = React.useState([]);
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
              setcontactlistdate(res.date);
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
        fetch("http://localhost:5000/getbirthdyadata", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            email: emailforgetdata,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setlist(data.data);
          });
        fetch("http://localhost:5000/sendBirthdayMail", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setlistofsendmail(data.list);
          });
        fetch("http://localhost:5000/inbox", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({ email: emailforgetdata }),
        })
          .then((res) => res.json())
          .then((res) => {
            setlistofmails(res.email);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log(listofmails);
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
          list,
          setlist,
          listofsendmail,
          setlistofsendmail,
          listofmails,
        }}
      >
        {children}
      </Context.Provider>
    </>
  );
}

export default Dataprovider;
