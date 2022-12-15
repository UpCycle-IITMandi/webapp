import AddVendorModal from "../common/AddVendorModal";
import Vendors from "../common/Vendors";
import Header from "../common/Header";
import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import Orders from "../vendor/Orders";
import Fetch from "../../common/Fetch";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
function Dashboard() {
  const Router=useRouter();
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const getOrders = async () => {
      var response = await Fetch({
        route: "/api/v1/order/getAll",
        type: "POST",
        header: {
          "Content-type": "application/json",
          Authorization: Cookies.get("super user token"),
        }
      });
      if (!response.success) {
        Router.push("");
      } else {
        console.log(response);
        setOrders(response.orders);
      }
    };
    getOrders();
  }, []);
  return (
    <div>
      <Header title="Superuser Dashboard" />
      <Grid container justify="center" spacing={6}>
        <Grid item xs={8.5}>
          <Vendors isEditable={true} size={4}/>;
        </Grid>
        <Grid item xs={3.5}>
          <Orders orders={orders} pages={1}/>
        </Grid>
      </Grid>
    </div>
  );
}

export default Dashboard;
