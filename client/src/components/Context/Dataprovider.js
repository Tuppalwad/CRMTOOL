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
  const [userImage, setUserImage] = React.useState(null);
  const [resultmails, setresultmails] = React.useState([]);
  const [attendencemails, setattendencemails] = React.useState([]);
  const [getspammails, setgetspammails] = React.useState([]);
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
            if (data.data === undefined) {
              setlist([]);
            } else {
              setlist(data.data);
            }
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
        fetch("http://localhost:5000/getImages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({ email: emailforgetdata }),
        })
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
            if (res.images === null) {
              setUserImage(null);
            } else {
              setUserImage(res.images);
            }
          });

        fetch("http://localhost:5000/getresultemails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({ email: emailforgetdata }),
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.status === "Success") {
              setresultmails(res.email);
            }
          });

        fetch("http://localhost:5000/getattendencemails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({ email: emailforgetdata }),
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.status === "Success") {
              setattendencemails(res.email);
            }
          });
        fetch("http://localhost:5000/getspamemails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({ email: emailforgetdata }),
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.status === "Success") {
              setgetspammails(res.email);
            }
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log(userImage);
  return (
    <>
      <Context.Provider
        value={{
          userImage,
          islogin,
          email,
          name,
          photo,
          phone,
          contactlist,
          smtp,
          list,
          listofsendmail,
          listofmails,
          contactlistdate,
          resultmails,
          attendencemails,
          getspammails,
        }}
      >
        {children}
      </Context.Provider>
    </>
  );
}

export default Dataprovider;
