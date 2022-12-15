import React from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
function index() {
  const Router = useRouter();
  useEffect(() => {
    Router.push("/superuser/dashboard");
  }, []);

  return <></>;
}

export default index;
