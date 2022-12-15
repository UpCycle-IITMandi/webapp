import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {Alert} from "@mui/material";
import Header from "../common/Header";
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
  const [vendorId,setVendorId]=useState(null);
  const [isIdRequired,setIdRequired]=useState(true);
  useEffect(()=>{ 

    if(props.vendorId){
      setVendorId(props.vendorId);
      console.log(props.vendorId);
      setIdRequired(false);
    }
  },[props]);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const onTextChangePassword = (e) => setPassword(e.target.value);
  const onTextChangeVendor = (e) => setVendorId(e.target.value);
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
    if (data.success) {
      Cookies.remove("super user token");
      localStorage.setItem("vendor token",data.data);
      Cookies.set("vendor token", data.data);
      Cookies.set("vendorId", data.vendorId);
      console.log(data);
      router.push({
        pathname: "/vendor/" + data.vendorId,
      });
    } else {
       setMessage(data.message);
    }
  };
  const paperStyle = {
    padding: 20,
    height: "auto",
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
        {isIdRequired&&(<> <TextField
           onChange={onTextChangeVendor}
            label="Vendor Id"
            fullWidth
          />
          <br></br>
          <br></br>
          </>
        )}
          <TextField
            onChange={onTextChangePassword}
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
