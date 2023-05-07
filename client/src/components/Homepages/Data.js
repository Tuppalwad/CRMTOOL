import React, { useContext } from "react";
import Context from "../Context/Createcontext";
function Data() {
  const { newdata } = useContext(Context);
  console.log("data");
  console.log(newdata);
  return (
    <div>
      <h1>data</h1>
    </div>
  );
}

export default Data;
