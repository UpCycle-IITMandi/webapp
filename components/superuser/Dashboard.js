import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import AddVendorModal from "./subcomponents/AddVendorModal";
import Vendors from "./subcomponents/Vendors";
import Header from "../Header";
import React, { useEffect, useState } from "react";
import Fetch from "../../common/Fetch";

function Dashboard() {
  return (
    <div>
      <Header title="Superuser Dashboard" />
      <AddVendorModal />
      <Vendors />
    </div>
  );
}

export default Dashboard;
