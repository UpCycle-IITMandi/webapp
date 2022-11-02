import React, { useEffect, useState } from "react";
import { Modal, Box, Typography, Button, TextField } from "@mui/material";

import Fetch from "../../common/Fetch";
import Vendor from "./Vendor";
import  Cookies  from "js-cookie";


function Vendors() {
  const [vendorLists,setVendorList]=useState([]);
  useEffect(() => {
    const getVendors=async()=>{
      var response = await Fetch({
        header:{
          "Content-type": "application/json",
          Authorization: Cookies.get("super user token") ? Cookies.get("super user token") : "",
       },
        route:
             "/api/v1/vendor/getAll",
      });
      console.log(response.vendors);
      setVendorList(response.vendors);
    }
      getVendors();
  },[]);
  return (
    <div className="row" style={{ padding: "10px" }}>
      {vendorLists.map((i) => (
        <div className="col" key={i._id}>
          <Vendor data={i} />
        </div>
      ))}
    </div>
  );
}

export default Vendors;
