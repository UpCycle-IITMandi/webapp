import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Header from "../Header";
import React, { useEffect, useState } from "react";
import Fetch from "../../common/Fetch";
import Cookie from "js-cookie";
import Cookies from "js-cookie";

function LoginVendor() {
  const [password, setPassword] = useState("");
  const [vendorId, setVendorId] = useState("");
  const [message, setMessage] = useState("");
  const onTextChange = (field) => {
    return field === "password"
      ? (e) => setPassword(e.target.value)
      : (e) => setVendorId(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    var data = await Fetch({
      route: "/vendor-login",
      type: "POST",
      header:{
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        vendorId: vendorId,
        password: password,
      }),
    });
    if (data.success) {
      Cookie.set("vendor token",data.data);
      window.location.href = "/vendor/"+data.name ;
    } else {
      setMessage(data.message);
    }
  };
  return (
    <div>
      <Header title="Vendor Login" />
      <Typography mt={2}>{message}</Typography>
      <div>
        <TextField
          onChange={onTextChange("vendorId")}
          value={vendorId}
          label={"Enter Vendor Id"}
        />
        <TextField
          onChange={onTextChange("password")}
          value={password}
          label={"Enter password"}
        />
      </div>
      <Button variant="contained" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
}

export default LoginVendor;
