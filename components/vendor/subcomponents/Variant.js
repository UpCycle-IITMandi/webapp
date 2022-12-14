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
import DeleteIcon from "@mui/icons-material/Delete";

function Variant(props) {
  const [nbRows, setNbRows] = React.useState(props.length);
  const [submit,setIsSubmit]=useState(false);
  const [isRow,setIsRow]=useState(false);
  function convertMapToRows(map) {
    var rows = [];
    map.forEach((value, key) => {
      rows.push(value);
    });
    return rows;
  }
  useEffect(() => {
    if(isRow){
    let tempRows= JSON.parse(JSON.stringify(rows));
    setIsSubmit(false);
    setIsRow(false);
    props.onVariantSubmit(tempRows);
    }
  }, [isRow]);
  const data = [
    { id: 1, type: "small", inStock: true, cost: 500 },
    { id: 2, type: "large", inStock: true, cost: 700 },
  ];
  const changeStockStatus = (e, params) => {
    var tempRows = JSON.parse(JSON.stringify(rows));
    var objIndex = tempRows.findIndex((obj) => obj.id == params.row.id);
    tempRows[objIndex].inStock = !tempRows[objIndex].inStock;
    if(submit){
      setIsRow(true);
    }
    apiRef.current?apiRef.current.setSelectionModel([]):"";
    setRows(tempRows);
  };
  var cols = [
    { field: "id", headerName: "S No.", width: 50 },
    { field: "type", headerName: "Dish Name", width: 120, editable: true },
    {
      field: "inStock",
      headerName: "In stock",
      width: 70,
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

    { field: "cost", headerName: "Dish Price", width: 80, editable: true },
    {
      field: "delete",
      headerName: "Delete Item",
      width: 80,
      renderCell: (params) => {
        return (
          <Button
            variant="outlined"
            startIcon={<DeleteIcon />}
            onClick={(e) => deleteRow(e, params)}
          >
          </Button>
        );
      },
    },
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
    if (!tempRows.length ) {
      tempRows = [
        {
          id:  1,
          type: "Type of variant",
          inStock: true,
          cost: 0,
        }
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
  const deleteRow = (e, params) => {
    var tempRows = JSON.parse(JSON.stringify(rows));
    tempRows = tempRows.filter((obj) => obj.id != params.row.id);
    setRows(tempRows);
  };
  const updateRows = (e, params) => {
    var receivedRows = apiRef.current.getRowModels();
    receivedRows = convertMapToRows(receivedRows);
    setRows(receivedRows);
    if(submit){
      setIsRow(true);
    }
    apiRef.current?apiRef.current.setSelectionModel([]):"";
  };
  const handleSubmit=(e)=>{
    if(apiRef.current&&(apiRef.current.getSelectedRows().size===0)){
      setIsRow(true);
    }
    setIsSubmit(true);
  }
  return (
    <Box container width={500}>
      <DialogTitle>{props.title}</DialogTitle>
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
      
    </Box>
  );
}

export default Variant;
