import { Modal, Box, Typography, Button, TextField, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import VendorMenu from "../vendor/VendorMenu";
import Orders from "../vendor/Orders";
import { useRouter } from "next/router";
import Fetch from "../../common/Fetch";
import Cookies from "js-cookie";
import Header from "../common/Header";
import VendorCard from "../common/VendorCard";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const vendorPage = () => {
  const Router = useRouter();
  const [Loading, setLoading] = useState(false);
  const [vendorData, setVendorData] = useState({});
  const [orders, setOrders] = useState([]);
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const { vendorId } = Router.query;
  useEffect(() => {
    const getVendor = async () => {
      var response = await Fetch({
        route: "/api/v1/vendor/getOne",
        type: "POST",
        header: {
          "Content-type": "application/json",
          authorization: Cookies.get("vendor token")
            ? Cookies.get("vendor token")
            : "",
        },
        body: JSON.stringify({
          vendorId: vendorId,
        }),
      });
      if (!response.success) {
        Router.push("/vendor/" + vendorId + "/login");
      } else {
        console.log("getVendor");
        setLoading(true);
        setVendorData(response.vendors);
      }
    };
    const getOrders = async () => {
      var response = await Fetch({
        route: "/api/v1/order/getAll",
        header: {
          "Content-type": "application/json",
          authorization: Cookies.get("vendor token")
            ? Cookies.get("vendor token")
            : "",
        },
      });
      if (!response.success) {
        console.log("getOrders", response);
        Router.push("/vendor/" + vendorId + "/login");
      } else {
        console.log("getOrders");
        setLoading(true);
        setOrders(response.orders);
      }
    };
    if (vendorId) {
      getVendor();
      getOrders();
    }
  }, [vendorId]);

  const updateVendor = (vendor) => {
    setVendorData(vendor);
  };
  return (
    <>
      {Loading && (
        <>
          <Header title={"Vendor Page"}></Header>
          <Box sx={{ bgcolor: "background.paper" }}>
            <AppBar position="static">
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="secondary"
                textColor="inherit"
                variant="fullWidth"
                aria-label="full width tabs example"
              >
                <Tab label="Orders" {...a11yProps(0)} />
                <Tab label="Menu" {...a11yProps(1)} />
              </Tabs>
            </AppBar>
            <SwipeableViews
              axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={value}
              onChangeIndex={handleChangeIndex}
            >
              <TabPanel value={value} index={0} dir={theme.direction}>
                <Grid container justify="center" spacing={2}>
                  <Grid item xs={8.5}>
                    <Orders orders={orders} pages={4} />
                  </Grid>
                  <Grid item xs={3.5}>
                    <VendorCard
                      data={vendorData}
                      isEditable={true}
                      updateFunction={updateVendor}
                      openAsVendor={false}
                    />
                  </Grid>
                </Grid>
              </TabPanel>
              <TabPanel value={value} index={1} dir={theme.direction}>
                <VendorMenu data={vendorData} />
              </TabPanel>
            </SwipeableViews>
          </Box>
        </>
      )}
    </>
  );
};

export default vendorPage;
