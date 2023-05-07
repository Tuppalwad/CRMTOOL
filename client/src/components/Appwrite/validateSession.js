/* eslint-disable react-hooks/rules-of-hooks */
import account from "./appwriteConfig";
import React from "react";

function validateSession() {
  const [userDetails, setUserDetails] = React.useState();
  try {
    const data = account.get();
    setUserDetails(data);
  } catch (error) {
    console.log(error);
    return false;
  }
  if (userDetails) {
    return true;
  }
  return false;
}
export default validateSession;

// export default validateSession
// export default function validateSession() {
//   const [userDetails, setUserDetails] = React.useState();
//   try {
//     const data = account.get();
//     setUserDetails(data);
//   } catch (error) {
//     console.log(error);
//     return false;
//   }

//   if (userDetails) {
//     return true;
//   }
//   return false;
// }
