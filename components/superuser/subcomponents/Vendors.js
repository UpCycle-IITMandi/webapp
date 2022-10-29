import React, { useEffect, useState } from "react";
import { Modal, Box, Typography, Button, TextField } from "@mui/material";

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
             "/api/v1/bazaar/listVendors",
      });
      console.log(response.vendors);
      setVendorList(response.vendors);
    }
      getVendors();
  },[]);
  let vendors = [
    {
      shopName: "Chawlas",
      ownerName: "Surender",
      upiId: "abcd@ybl",
      address: "Kataula",
      images: [
        "https://picsum.photos/seed/chawlas/300/200",
        "https://picsum.photos/seed/chawla/300/200",
        "https://picsum.photos/seed/guleria/300/200",
      ],
      message: "Hey kids",
    },
    {
      shopName: "Baba",
      ownerName: "Babaji",
      upiId: "pqrs@ybl",
      address: "Salgi",
      images: [
        "https://picsum.photos/seed/baba/300/200",
        "https://picsum.photos/seed/babaji/300/200",
      ],
      message: "Hor bai kiddan",
    },
    {
      shopName: "Jeeva's",
      ownerName: "Panchi",
      upiId: "trey@ybl",
      address: "North Campus",
      images: [
        "https://picsum.photos/seed/jeeva/300/200",
        "https://picsum.photos/seed/jeevas/300/200",
      ],
      message: "Hello baccho",
    },
  ];
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
