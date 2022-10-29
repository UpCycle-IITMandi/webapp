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
    <Grid container spacing={2}>
      {props.orders.map((order, i) => (
        <Grid item xs={12}>
          <OrderCard order={order} />
        </Grid>
      ))}
    </Grid>
  );
}

export default Orders;
