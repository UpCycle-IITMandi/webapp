import { Modal, Box, Typography, Button, TextField, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import VendorMenu from "../vendor/VendorMenu";
import EditVendor from "../vendor/EditVendor";
import Orders from "../vendor/Orders";
import { useRouter } from "next/router";
import Fetch from "../../common/Fetch";
import Cookies from "js-cookie";
import Header from "../superuser/Header";
const vendorPage = () => {
  const Router=useRouter();
  const [Loading,setLoading]=useState(false);
  const [vendorData, setVendorData] = useState({});

  const { vendorId } = Router.query;
  useEffect(() => {  
   
    const getVendor=async()=>{
      var response = await Fetch({
        route:
            "/api/v1/vendor/getOne",
        type:"POST",
        header:{
           "Content-type": "application/json",
           Authorization: Cookies.get("vendor token") ? Cookies.get("vendor token") : "",
        },
        body:JSON.stringify({
          vendorId: vendorId,
        })
      });
      if(!response.success){
        Router.push("/vendor/"+vendorId+"/login");
      }
      else{
      setLoading(true);
      setVendorData(response.vendors);
      }
    }
    if(vendorId){ 
    getVendor();
    }
  },[vendorId]);

  var orders = [
    {
      id: "order-id-1",
      items: [
        { name: "Butter chicken", quantity: 2 },
        { name: "Chicken Tikka", quantity: 3 },
      ],
      address: "Room no 125, B9, North Campus",
      cost: 545,
    },
    {
      id: "order-id-2",
      items: [
        { name: "Veg biryani", quantity: 2 },
        { name: "Crispy veg", quantity: 3 },
      ],
      address: "Room no 123, B11, South Campus",
      cost: 340,
    },
  ];
  return (
    <> 
    {Loading&&
    <>
    <Header></Header>
    <div>
      <div>
        <p>VendorId: {vendorId}</p>
        <EditVendor vendorId={vendorId} />
      </div>
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <VendorMenu data={vendorData}/>
        </Grid>
        <Grid item xs={3}>
          <Orders orders={orders} />
        </Grid>
      </Grid>
    </div>
    </>
  }
    </>
  );
};

export default vendorPage;
