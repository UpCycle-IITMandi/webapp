import React, { useEffect, useState } from "react";
import { Modal, Box, Typography, Button, TextField } from "@mui/material";

import Header from "../../Header";
import Fetch from "../../../common/Fetch";
import Vendor from "./Vendor";

function Vendors() {
  const vendors = [
    {
      shopName: "Chawlas",
      ownerName: "Surender",
      upiId: "abcd@ybl",
      address: "Kataula",
      images: [
        "https://picsum.photos/seed/chawlas/300/200",
        "https://picsum.photos/seed/chawla/300/200",
        "https://picsum.photos/seed/guleria/300/200",
      ],
      message: "Hey kids",
    },
    {
      shopName: "Baba",
      ownerName: "Babaji",
      upiId: "pqrs@ybl",
      address: "Salgi",
      images: [
        "https://picsum.photos/seed/baba/300/200",
        "https://picsum.photos/seed/babaji/300/200",
      ],
      message: "Hor bai kiddan",
    },
    {
      shopName: "Jeeva's",
      ownerName: "Panchi",
      upiId: "trey@ybl",
      address: "North Campus",
      images: [
        "https://picsum.photos/seed/jeeva/300/200",
        "https://picsum.photos/seed/jeevas/300/200",
      ],
      message: "Hello baccho",
    },
  ];

  return (
    <div className="row" style={{ padding: "10px" }}>
      {vendors.map((vendor, i) => (
        <div className="col" key={i}>
          <Vendor data={vendor} />
        </div>
      ))}
    </div>
  );
}

export default Vendors;
