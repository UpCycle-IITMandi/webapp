import React from "react";
import { useRouter } from "next/router";
import Vendor from "../../components/vendor";
function vendor() {
  const router = useRouter();
  const { vendorId } = router.query;
  return <Vendor vendorId={vendorId} />;
}

export default vendor;
