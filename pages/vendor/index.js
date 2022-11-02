import React from "react";
import Cookies from "js-cookie"
import { Button} from "@mui/material";
import Vendors from "../../components/vendor/AllVendors"
import Vendor from "../../components/vendor/Vendor";
import { useRouter } from "next/router";

function index() {
const Router=useRouter();
  function handleVendorSubmit(){
    Router.push({
        pathname: "/vendor/login" ,
      })
  }
  return <>
  <h1>Home</h1>
  <div >
    <Button variant="contained" onClick={handleVendorSubmit}>
        vendor login
    </Button>
    <Vendors></Vendors>
    </div>
  </> 
}

export default index;