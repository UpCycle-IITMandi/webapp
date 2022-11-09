import React from "react";
import Cookies from "js-cookie";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import Vendors from "../../components/vendor/AllVendors";
import Header from "../../components/Header";
function index() {
  const Router = useRouter();
  Cookies.remove("super user token");
  Cookies.remove("vendor token");
  function handleSuperUserSubmit() {
    Router.push({
      pathname: "/superuser/login",
    });
  }
  function handleVendorSubmit() {
    Router.push({
      pathname: "/vendor",
    });
  }
  return (
    <>
      <div>
        <Header></Header>
        <br />
        <div>
          <Vendors></Vendors>
        </div>
      </div>
    </>
  );
}

export default index;
