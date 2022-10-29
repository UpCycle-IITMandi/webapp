import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import {
  Box,
  Modal,
  Paper,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import { Card, CardActions, CardContent, CardMedia } from "@mui/material";

function OrderCard(props) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {props.order.id}
        </Typography>
        <Typography variant="h6" component="div">
          Items
        </Typography>
        {props.order.items.map((item, i) => (
          <Paper key={i}>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {item.name} : {item.quantity}
            </Typography>
          </Paper>
        ))}
        <Typography variant="body2">
          Address : {props.order.address} <br /> Cost : {props.order.cost}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Mark as delivered</Button>
      </CardActions>
    </Card>
  );
}

export default OrderCard;
