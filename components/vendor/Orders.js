import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import {
  Box,
  Modal,
  Paper,
  Typography,
  Button,
  TextField,
  AppBar,
  Toolbar,
  Grid,
} from "@mui/material";
import { Card, CardActions, CardContent, CardMedia } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import OrderCard from "./subcomponents/OrderCard";

function Orders(props) {
  const [pendingOrder, setPendingOrder] = useState([]);
  const [inqueueOrder, setInqueueOrder] = useState([]);
  const [deliveredOrder, setDeliveredOrder] = useState([]);
  const [pagePending, setPagePending] = React.useState(1);
  const [pageInqueue, setPageInqueue] = React.useState(1);
  const [pageDelivered, setPageDelivered] = React.useState(1);
  const pagesize = 4;
  const handleChangePending = (event, value) => {
    setPagePending(value);
  };
  const handleChangeInqueue = (event, value) => {
    setPageInqueue(value);
  };
  const handleChangeDelivered = (event, value) => {
    setPageDelivered(value);
  };
  useEffect(() => {
    if (props.orders) {
      setPendingOrder(
        props.orders.filter((order) => order.status == "Pending"),
      );
      setInqueueOrder(
        props.orders.filter((order) => order.status == "Inqueue"),
      );
      setDeliveredOrder(
        props.orders.filter((order) => order.status == "Delivered"),
      );
    }
  }, [props]);
  useEffect(() => {}, [pendingOrder, inqueueOrder, deliveredOrder]);
  function handleInqueueChange(propsId) {
    setInqueueOrder((prev) => prev.filter((order) => order._id != propsId._id));
    setDeliveredOrder((prev) => [...prev, ...[propsId]]);
  }
  function handlePendingChange(propsId) {
    setPendingOrder((prev) => prev.filter((order) => order._id != propsId._id));
    setInqueueOrder((prev) => [...prev, ...[propsId]]);
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box style={{ margin: "28px" }}>
        <Typography variant="h6" component="div" style={{ padding: "10px" }}>
          Pending Orders
        </Typography>
      </Box>
      <Stack spacing={2} alignItems="center">
        <Grid container spacing={1}>
          {pendingOrder
            .slice(pagesize * (pagePending - 1), pagesize * pagePending)
            .map((order, i) => (
              <Grid item xs={3} key={i._id}>
                <OrderCard order={order} onPropsChange={handlePendingChange} />
              </Grid>
            ))}
        </Grid>
        <Pagination
          count={Math.ceil(pendingOrder.length / pagesize)}
          page={pagePending}
          onChange={handleChangePending}
        />
      </Stack>
      <Box style={{ margin: "28px" }}>
        <Typography variant="h6" component="div" style={{ padding: "10px" }}>
          Order in queue
        </Typography>
      </Box>
      <Stack spacing={2} alignItems="center">
        <Grid container spacing={1}>
          {inqueueOrder
            .slice(pagesize * (pageInqueue - 1), pagesize * pageInqueue)
            .map((order, i) => (
              <Grid item xs={3} key={i._id}>
                <OrderCard order={order} onPropsChange={handleInqueueChange} />
              </Grid>
            ))}
        </Grid>
        <Pagination
          count={Math.ceil(inqueueOrder.length / pagesize)}
          page={pageInqueue}
          onChange={handleChangeInqueue}
        />
      </Stack>
      <Box style={{ margin: "28px" }}>
        <Typography variant="h6" component="div" style={{ padding: "10px" }}>
          Delivered orders
        </Typography>
      </Box>
      <Stack spacing={2} alignItems="center">
        <Grid container spacing={1}>
          {deliveredOrder
            .slice(pagesize * (pageDelivered - 1), pagesize * pageDelivered)
            .map((order, i) => (
              <Grid item xs={3} key={i._id}>
                <OrderCard order={order} />
              </Grid>
            ))}
        </Grid>
        <Pagination
          count={Math.ceil(deliveredOrder.length / pagesize)}
          page={pageDelivered}
          onChange={handleChangeDelivered}
        />
      </Stack>
    </Box>
  );
}

export default Orders;
