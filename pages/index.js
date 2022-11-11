import React from "react";
import Cookies from "js-cookie";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import Vendors from "../components/common/Vendors";
import Header from "../components/Header";

function root() {
  const Router = useRouter();
  return (
    <>
      <div>
        <Header />
        <br />
        <div>
          <Vendors />
        </div>
      </div>
    </>
  );
}

export default root;
