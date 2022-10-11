import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Modal, Button, Stack } from "@mui/material";
import Fetch from "../../common/Fetch";
import useApiRef from "./subcomponents/ApiRef";

var cols = [
  { field: "name", headerName: "Dish Name", width: 150, editable: true },
  { field: "price", headerName: "Dish Price", width: 150, editable: true },
];

function VendorMenu() {
  const [rows, setRows] = React.useState([
    { id: 1, name: "Chole Bhature", price: "100" },
    { id: 2, name: "Paneer Tikka", price: "200" },
    { id: 3, name: "Hakka Noodles", price: "80" },
  ]);
  const { apiRef, columns } = useApiRef(cols);

  const addRow = () => {
    var tempRows = JSON.parse(JSON.stringify(rows));
    tempRows.push({
      id: tempRows[tempRows.length - 1].id + 1,
      name: "Chicken Dum Biryani",
      price: "300",
    });
    setRows(tempRows);
  };

  const submitData = () => {
    var receivedRows = apiRef.current.getRowModels();
    console.log(receivedRows);
  };

  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <DataGrid autoHeight rows={rows} columns={columns} />
        <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
          <Button size="small" onClick={addRow}>
            Add a row
          </Button>
        </Stack>
      </Box>
      <div>
        <Button size="small" onClick={submitData}>
          Submit Data
        </Button>
      </div>
    </div>

    // <div style={{ height: 400, width: "100%" }}>
    //   <div style={{ display: "flex", height: "100%" }}>
    //     <div style={{ flexGrow: 1 }}>
    //       <DataGrid rows={rows} columns={columns} />
    //     </div>
    //   </div>
    // </div>
  );
}

export default VendorMenu;
