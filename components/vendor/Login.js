import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {Alert} from "@mui/material";
import Header from "../Header";
import React, { useEffect, useState } from "react";
import Fetch from "../../common/Fetch";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import {
  Grid,
  Paper,
  Link,
} from "@mui/material";
function Login(props) {
  const router = useRouter();
  const { vendorId } = router.query;
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const onTextChange = (e) => setPassword(e.target.value);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    var data = await Fetch({
      route: "/vendor-login",
      type: "POST",
      header: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        vendorId: vendorId,
        password: password,
      }),
    });
    console.log(data);
    if (data.success) {
      Cookies.set("vendor token", data.data);
      router.push({
        pathname: "/vendor/" + data.vendorId,
      });
    } else {
       setMessage("invalid password");
    }
  };
  const paperStyle = {
    padding: 20,
    height: "40vh",
    width: 280,
    margin: "60px auto",
  };
  const btnstyle = { margin: "8px 0" };
  return (
    <>
    <Header></Header>
      <Grid>
      {message&&<Alert severity="error">{message}</Alert>}
        <Paper elevation={10} style={paperStyle}>
          <TextField
            onChange={onTextChange}
            label="Password"
            type="password"
            fullWidth
          />
          <br></br>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            onClick={handleSubmit}
            style={btnstyle}
            fullWidth
          >
            Sign in
          </Button>
          <Link>Forgot password ?</Link>
        </Paper>
      </Grid>
    </>
  );
}

export default Login;
