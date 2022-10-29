import React from "react";
import Cookies from "js-cookie"
function index() {
  Cookies.remove("super user token");
  Cookies.remove("vendor token");
  return <>
  <h1>Home</h1>
  </> 
}

export default index;
