import AddVendorModal from "../common/AddVendorModal";
import Vendors from "../common/Vendors";
import Header from "../common/Header";
import React, { useEffect, useState } from "react";

function Dashboard() {
  return (
    <div>
      <Header title="Superuser Dashboard" />
      <Vendors isEditable={true} />;
    </div>
  );
}

export default Dashboard;
