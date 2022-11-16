import React from "react";
import Login from "../../../components/vendor/Login";
import { useRouter } from "next/router";
function login() {
  const router = useRouter();
  const { vendorId } = router.query;
  return <Login vendorId={vendorId} />;
}

export default login;