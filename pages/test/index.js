import React from "react";
import { useRouter } from "next/router";
import AddEditVendorForm from "../../components/common/AddEditVendorForm";
import Vendors from "../../components/common/Vendors";
function test() {
  const [val, setVal] = React.useState(0);
  const updateVendor = (response) => {
    setVal(val + 1);
  };
  const router = useRouter();
  // return <AddEditVendorForm updateVendor={updateVendor} />;
  return <Vendors isEditable={true} />;
}

export default test;
