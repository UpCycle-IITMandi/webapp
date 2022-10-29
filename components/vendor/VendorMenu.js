import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Modal, Button, Stack } from "@mui/material";
import Fetch from "../../common/Fetch";
import useApiRef from "./subcomponents/ApiRef";
import { Card, CardActions, CardContent, CardMedia } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
function convertMapToRows(map) {
  var rows = [];
  map.forEach((value, key) => {
    rows.push(value);
  });
  return rows;
}

function VendorMenu(props) {

  const [vendorLists,setVendorList]=useState([]);
  const router = useRouter();
    const { vendorId } = router.query;
    console.log(vendorId);
  useEffect(() => {  
   
    const getVendor=async()=>{
      var response = await Fetch({
        route:
            "/api/v1/bazaar/getVendorData",
        type:"POST",
        header:{
           "Content-type": "application/json",
           Authorization: Cookies.get("vendor token") ? Cookies.get("vendor token") : "",
        },
        body:JSON.stringify({
          vendorId: vendorId,
        })
      });
      setVendorList(response.vendors);
    }
    if(vendorId){ 
    getVendor();
    }
  },[vendorId]);
  var cols = [
    { field: "name", headerName: "Dish Name", width: 150, editable: true },
    { field: "price", headerName: "Dish Price", width: 150, editable: true },
    {
      field: "image",
      headerName: "Image",
      width: 150,
      renderCell: (params) => {
        return <CardMedia component="img" height="140" image={params.value} />;
      },
    },
    {
      field: "upload",
      headerName: "Upload Picture",
      width: 150,
      renderCell: (params) => {
        return (
          <Button
            variant="contained"
            component="label"
            onChange={(e) => addImage(e, params)}
          >
            Add Image
            <input hidden type="file" />
          </Button>
        );
      },
    },
    {
      field: "delete",
      headerName: "Delete Item",
      width: 150,
      renderCell: (params) => {
        return (
          <Button
            variant="outlined"
            startIcon={<DeleteIcon />}
            onClick={(e) => deleteRow(e, params)}
          >
            Delete
          </Button>
        );
      },
    },
  ];
  const { apiRef, columns } = useApiRef(cols);
  const [rows, setRows] = React.useState([
    {
      id: 1,
      name: "Chole Bhature",
      price: "100",
      image: "https://picsum.photos/seed/chawla/300/200",
      upload: "Pranshu",
    },
    {
      id: 2,
      name: "Paneer Tikka",
      price: "200",
      image: "https://picsum.photos/seed/chawla/300/200",
      upload: "Pranshu",
    },
    {
      id: 3,
      name: "Hakka Noodles",
      price: "80",
      image: "https://picsum.photos/seed/guleria/300/200",
      upload: "Pranshu",
    },
  ]);

  const addImage = (e, params) => {
    var url = URL.createObjectURL(e.target.files[0]);
    var tempRows = JSON.parse(JSON.stringify(rows));
    var objIndex = tempRows.findIndex((obj) => obj.id == params.row.id);
    tempRows[objIndex].image = url;
    tempRows[objIndex].imageFile = e.target.files[0];
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
    console.log("Received rows", receivedRows);
    setRows(receivedRows);
  };

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
    receivedRows = convertMapToRows(receivedRows);
    console.log(receivedRows);
    console.log("Real rows", rows);
    console.log(rows == receivedRows);
  };

  return (
    <div>
      {vendorLists &&
      <>  <p>{vendorLists.shopName}</p>
      <p>{vendorLists.ownerName}</p>
      <p>{vendorLists.upiId}</p>
      <p>{vendorLists.address}</p>
      <p>{vendorLists.message}</p>
      </> 
      }
      <Box sx={{ width: "100%" }}>
        <DataGrid
          autoHeight
          rows={rows}
          columns={columns}
          onCellEditStop={(params, event) => updateRows(event, params)}
        />
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
  );
}

export default VendorMenu;
