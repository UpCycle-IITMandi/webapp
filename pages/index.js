import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Vendors from "../components/common/Vendors";
import Header from "../components/common/Header";
import Cookies from "js-cookie";

function root() {
  const Router = useRouter();
  const vendorData=Cookies.get("vendor token");
  const  superUserToken=Cookies.get("super user token");
  const vendorId=Cookies.get("vendorId");
  useEffect(() => {
    if(vendorData!=null){
      Router.push({
        pathname: "/vendor/" + vendorId,
      });
    }
    else if(superUserToken!=null){
      Router.push({
        pathname: "/superuser/dashboard",
      });
    }
  }, []);
  return (
    <>
      {(!superUserToken&&!vendorData)&&<div>
        <Header />
        <br />
        <div>
          <Vendors size={3}/>
        </div>
      </div>
}
    </>
  );
}

export default root;
