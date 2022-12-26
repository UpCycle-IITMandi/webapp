import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Grid, Paper, Link, Alert } from "@mui/material";
import Header from "../common/Header";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Fetch from "../../common/Fetch";
import { useRouter } from "next/router";

function LoginSuperUser() {
  const Router = useRouter();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const onTextChange = (e) => setPassword(e.target.value);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    var data = await Fetch({
      route: "/superuser-login",
      header: {
        "Content-type": "application/json",
      },
      type: "POST",
      body: JSON.stringify({
        password: password,
      }),
    });

    if (data.success) {
      Cookies.remove("vendor token");
      localStorage.setItem("super user token", data.data);
      Cookies.set("super user token", data.data);
      Router.push("/superuser/dashboard");
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
    <div>
      <>
        <Header></Header>
        <Grid>
          {message && <Alert severity="error">{message}</Alert>}
          <Paper elevation={10} style={paperStyle}>
            <TextField
              label="Password"
              onChange={onTextChange}
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
    </div>
  );
}

export default LoginSuperUser;
