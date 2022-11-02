import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Header from "../Header";
import React, { useEffect, useState } from "react";
import  Cookies  from "js-cookie";
import Fetch from "../../common/Fetch";
import { useRouter } from "next/router";
function LoginSuperUser() {
  const Router=useRouter();
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
      body:JSON.stringify( {
        password: password,
      }),
    });
  
    if (data.success) {
      localStorage.setItem("super user token",data.data);
      Cookies.set("super user token",data.data);
      Router.push("/superuser/dashboard");
      
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

export default LoginSuperUser;
