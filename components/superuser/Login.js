import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Header from "../Header";
import React, { useEffect, useState } from "react";
import Fetch from "../../common/Fetch";

function Login() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const onTextChange = (e) => setPassword(e.target.value);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    var data = await Fetch({
      route: "/superuser-login",
      type: "POST",
      body: {
        password: password,
      },
    });
    if (data.success) {
      window.location.href = "/superuser";
    } else {
      setMessage(data.message);
    }
  };
  return (
    <div>
      <Header title="Superuser Login" />
      <Typography mt={2}>{message}</Typography>
      <TextField
        onChange={onTextChange}
        value={password}
        label={"Enter password"}
      />
      <Button variant="contained" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
}

export default Login;