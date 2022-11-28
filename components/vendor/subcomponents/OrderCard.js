import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import Fetch from "../../../common/Fetch";
import Cookies from "js-cookie";
import {
  Box,
  Modal,
  Paper,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import { Card, CardActions, CardContent, CardMedia } from "@mui/material";
import { useRouter } from "next/router";

function OrderCard(props) {
  let count = 1;
  const Router = useRouter();
  const updateOrderStatus = async (status) => {
    var response = await Fetch({
      route: "/api/v1/order/updateOrderStatus",
      type: "POST",
      header: {
        "Content-type": "application/json",
        Authorization: Cookies.get("vendor token")
          ? Cookies.get("vendor token")
          : "",
      },
      body: JSON.stringify({
        vendorId: props.order.vendorId,
        orderId: props.order._id,
        status: status,
      }),
    });
    if (!response.success) {
      Router.push("/vendor/" + props.order.vendorId + "/login");
    } else {
      let order=props.order;
      order.status=status;
      props.onPropsChange(order);
    }
  };
  const handlePendingOrder = () => {
    updateOrderStatus("Inqueue");
  };
  const handleAcceptedOrder = () => {
    updateOrderStatus("Delivered");
  };
  return (
    <>
    {(props.order)&&(<Card sx={{ minWidth: 100 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Order-{count}
        </Typography>
        <Typography variant="h6" component="div">
          Items
        </Typography>
        {props.order.orderDescription.map((item, i) => (
          <Paper key={i}>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {item.productId} : {item.quantity}
            </Typography>
          </Paper>
        ))}
        <Typography variant="body2">
          Address : {props.order.address} <br /> Cost : {props.order.cost}
        </Typography>
      </CardContent>
      <CardActions>
        {props.order.status == "Inqueue" && (
          <Button size="small" variant="outlined" onClick={handleAcceptedOrder}>
            Mark as delivered
          </Button>
        )}
        {props.order.status == "Pending" && (
          <Button size="small" variant="outlined" onClick={handlePendingOrder}>
            Accept the order
          </Button>
        )}
        {props.order.status == "Delivered" && (
          <Button size="small" variant="outlined" disabled>
            Delivered
          </Button>
        )}
      </CardActions>
    </Card>)
        }
        </>
  );
}

export default OrderCard;
