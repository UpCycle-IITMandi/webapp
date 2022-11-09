import React, { useEffect, useState } from "react";

import Fetch from "../../common/Fetch";
import Vendor from "./Vendor";
import  Cookies  from "js-cookie";
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
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
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {vendorLists.map((i)  => (
          <Grid item xs={2} sm={4} md={3} key={i._id}>
            <Vendor data={i}></Vendor>
          </Grid>
        ))}
      </Grid>
    </Box>
   </div>
  );
}

export default Vendors;
