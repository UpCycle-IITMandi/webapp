import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import {
  Box,
  Modal,
  Paper,
  Typography,
  Button,
  TextField,
  Grid,
} from "@mui/material";
import { Card, CardActions, CardContent, CardMedia } from "@mui/material";
import OrderCard from "./subcomponents/OrderCard";

function Orders(props) {
  return (

    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 9 }}>
         {props.orders.map((order, i) => (
         <Grid item xs={2} sm={4} md={3} key={i._id}>
          <OrderCard order={order} />
        </Grid>
      ))}
      </Grid>
    </Box>
    

  );
}

export default Orders;
