import AddVendorModal from "../common/AddVendorModal";
import Vendors from "../common/Vendors";
import Header from "./Header";
import React, { useEffect, useState } from "react";

function Dashboard() {
  const [state, setState] = React.useState(0);
  const updateDashboard = (...anything) => {
    setState(state + 1);
  };
  return (
    <div>
      <Header title="Superuser Dashboard" />
      <AddVendorModal updateFunction={updateDashboard} />
      <Vendors isEditable={true} />;
    </div>
  );
}

export default Dashboard;
