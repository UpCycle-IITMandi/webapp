import React, { useEffect, useState } from "react";
import { Modal, Box, Typography, Button, TextField,Grid } from "@mui/material";

import Header from "../../Header";
import Fetch from "../../../common/Fetch";
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
    <Box sx={{ flexGrow: 1 }}>
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
      {vendorLists.map((i)  => (
        <Grid item xs={2} sm={4} md={3} key={i._id}>
          <Vendor data={i}></Vendor>
        </Grid>
      ))}
    </Grid>
  </Box>
  );
}

export default Vendors;
