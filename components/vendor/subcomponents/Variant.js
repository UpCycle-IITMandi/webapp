import React, { useEffect, useState } from "react";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Switch, DialogActions } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import useApiRef from "./ApiRef";

function Variant(props) {
  const [nbRows, setNbRows] = React.useState(props.length);
  function convertMapToRows(map) {
    var rows = [];
    map.forEach((value, key) => {
      rows.push(value);
    });
    return rows;
  }
  const data = [
    { id: 1, type: "small", inStock: true, cost: 500 },
    { id: 2, type: "large", inStock: true, cost: 700 },
  ];
  const changeStockStatus = (e, params) => {
    var tempRows = JSON.parse(JSON.stringify(rows));
    var objIndex = tempRows.findIndex((obj) => obj.id == params.row.id);
    tempRows[objIndex].inStock = !tempRows[objIndex].inStock;
    setRows(tempRows);
  };
  var cols = [
    { field: "id", headerName: "S No.", width: 100 },
    { field: "type", headerName: "Dish Name", width: 100, editable: true },
    {
      field: "inStock",
      headerName: "In stock",
      width: 100,
      renderCell: (params) => {
        return (
          <Switch
            checked={params.value}
            onChange={(e) => changeStockStatus(e, params)}
            inputProps={{ "aria-label": "controlled" }}
          />
        );
      },
    },
    { field: "cost", headerName: "Dish Price", width: 100, editable: true },
  ];
  const [rows, setRows] = useState([]);
  const { apiRef, columns } = useApiRef(cols);
  useEffect(() => {
    if (props.values) {
      setRows(props.values);
    }
  }, [props]);

  const addRow = () => {
    var tempRows = JSON.parse(JSON.stringify(rows));
    if (!tempRows.length) {
      tempRows = [
        {
          id: 1,
          type: "Type of variant",
          inStock: true,
          cost: 0,
        },
      ];
    } else {
      tempRows.push({
        id: tempRows.length + 1,
        type: "Type of variant",
        inStock: true,
        cost: 0,
      });
    }
    setRows(tempRows);
  };
  const updateRows = (e, params) => {
    var receivedRows = apiRef.current.getRowModels();
    receivedRows = convertMapToRows(receivedRows);
    console.log("Received rows", receivedRows);
    setRows(receivedRows);
  };
  const handleSubmit = (e) => {
    let tempRows = JSON.parse(JSON.stringify(rows));
    props.onVariantSubmit(tempRows);
  };
  return (
    <>
      <DialogTitle>{"Use Google's location service?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          <Box>
            <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
              <Button size="small" onClick={addRow}>
                Add a row
              </Button>
            </Stack>
            <DataGrid
              autoHeight
              rows={rows}
              columns={columns}
              onCellEditStop={(params, event) => updateRows(event, params)}
            />
          </Box>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit}>Submit</Button>
        <Button onClick={props.onVariantChange}>Close</Button>
      </DialogActions>
    </>
  );
}

export default Variant;
