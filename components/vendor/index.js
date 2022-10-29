import { Modal, Box, Typography, Button, TextField, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import VendorMenu from "../vendor/VendorMenu";
import EditVendor from "../vendor/EditVendor";
import Orders from "../vendor/Orders";

const vendorPage = ({ vendorId = null }) => {
  const [vendorData, setVendorData] = useState({});

  useEffect(() => {
    // api call to fetch vendor data from database
    setVendorData({});
  }, []);

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
    <div>
      <div>
        <p>VendorId: {vendorId}</p>
        <EditVendor vendorId={vendorId} />
      </div>
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <VendorMenu />
        </Grid>
        <Grid item xs={3}>
          <Orders orders={orders} />
        </Grid>
      </Grid>
    </div>
  );
};

export default vendorPage;
