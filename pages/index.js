import React from "react";
import { useRouter } from "next/router";
import Vendors from "../components/common/Vendors";
import Header from "../components/common/Header";

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
