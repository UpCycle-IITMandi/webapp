import Head from "next/head";
import Script from "next/script";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import HomeIcon from '@mui/icons-material/Home';
import { useRouter } from "next/router";
import AddVendorModal from "./AddVendorModal";
import Cookies from "js-cookie";
function Header(props) {
  const Router = useRouter();
  const [state, setState] = React.useState(0);
  function handleSuperUserSubmit() {
    Router.push({
      pathname: "/superuser/login",
    });
  }
  function handleLogoutSubmit() {
    Cookies.remove("vendor token");
    Cookies.remove("super user token");
    localStorage.removeItem("vendor token");
    localStorage.removeItem("super user token");
    Router.push({
      pathname: "/",
    });
  }
  function handleVendorSubmit() {
    Router.push({
      pathname: "/vendor/login",
    });
  }
  function handleLandingSubmit() {
    Router.push({
      pathname: "/",
    });
  }

  return (
    <>
      <Head>
        <title>{props.title ? props.title : "Village Square"}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="stylesheet" href="/css/index.css" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css"
          integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx"
          crossOrigin="anonymous"
        ></link>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </Head>
      <Box sx={{ flexGrow: 1}}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleLandingSubmit}
            >
              <HomeIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} cursor={"pointer"}>
              Village Square
            </Typography>
            {(!props.title)&&(<> <Button color="inherit" onClick={handleSuperUserSubmit}>
              Superuser Login
            </Button>
            <Button color="inherit" onClick={handleVendorSubmit}>
              Vendor Login
            </Button>
            </>)}
            {props.title&&( 
              <>
              {props.title!=="Vendor Page" }
            <Button color="inherit" onClick={handleLogoutSubmit}>
              Logout
            </Button>
            </>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
export default Header;
