import React from "react";
import Cookies from "js-cookie"
import { Button} from "@mui/material";
import { useRouter } from "next/router";
function index() {
  const Router=useRouter();
  Cookies.remove("super user token");
  Cookies.remove("vendor token");
  function handleSuperUserSubmit(){
    Router.push({
      pathname:"/superuser/login",
    }
  )
  }
  function handleVendorSubmit(){
    Router.push({
      pathname:"/vendor",
    })
  }
  return <>
  <h1>Home</h1>
  <div >
  <Button variant="contained" onClick={handleSuperUserSubmit}>
        Super user login
    </Button>
    <Button variant="contained" onClick={handleVendorSubmit}>
        vendor
    </Button>
    </div>
  </> 
}

export default index;
