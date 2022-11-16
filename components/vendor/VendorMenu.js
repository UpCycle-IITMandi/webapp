import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Stack, Typography } from "@mui/material";
import useApiRef from "./subcomponents/ApiRef";
import { Alert } from "@mui/material";
import { CardMedia } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Fetch from "../../common/Fetch";
import Cookies from "js-cookie";
import PropTypes from "prop-types";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";

function convertMapToRows(map) {
  var rows = [];
  map.forEach((value, key) => {
    rows.push(value);
  });
  return rows;
}

function VendorMenu(props) {
  const [menuImage, setMenuImage] = useState([]);
  const [vendorId, setVendorId] = useState("");
  const [menuMessage, setMenuMessage] = useState("");
  const [open, setOpen] = useState(false);
  const btnstyle = { margin: "8px 0" };
  function isOverflown(element) {
    return (
      element.scrollHeight > element.clientHeight ||
      element.scrollWidth > element.clientWidth
    );
  }

  const GridCellExpand = React.memo(function GridCellExpand(props) {
    const { width, value } = props;
    const wrapper = React.useRef(null);
    const cellDiv = React.useRef(null);
    const cellValue = React.useRef(null);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [showFullCell, setShowFullCell] = React.useState(false);
    const [showPopper, setShowPopper] = React.useState(false);

    const handleMouseEnter = () => {
      const isCurrentlyOverflown = isOverflown(cellValue.current);
      setShowPopper(isCurrentlyOverflown);
      setAnchorEl(cellDiv.current);
      setShowFullCell(true);
    };

    const handleMouseLeave = () => {
      setShowFullCell(false);
    };

    React.useEffect(() => {
      if (!showFullCell) {
        return undefined;
      }

      function handleKeyDown(nativeEvent) {
        // IE11, Edge (prior to using Bink?) use 'Esc'
        if (nativeEvent.key === "Escape" || nativeEvent.key === "Esc") {
          setShowFullCell(false);
        }
      }

      document.addEventListener("keydown", handleKeyDown);

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, [setShowFullCell, showFullCell]);

    return (
      <Box
        ref={wrapper}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        sx={{
          alignItems: "center",
          lineHeight: "24px",
          width: "100%",
          height: "100%",
          position: "relative",
          display: "flex",
        }}
      >
        <Box
          ref={cellDiv}
          sx={{
            height: "100%",
            width,
            display: "block",
            position: "absolute",
            top: 0,
          }}
        />
        <Box
          ref={cellValue}
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {value}
        </Box>
        {showPopper && (
          <Popper
            open={showFullCell && anchorEl !== null}
            anchorEl={anchorEl}
            style={{ width, marginLeft: -17 }}
          >
            <Paper
              elevation={1}
              style={{ minHeight: wrapper.current.offsetHeight - 3 }}
            >
              <Typography variant="body2" style={{ padding: 8 }}>
                {value}
              </Typography>
            </Paper>
          </Popper>
        )}
      </Box>
    );
  });

  GridCellExpand.propTypes = {
    value: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
  };

  function renderCellExpand(params) {
    return (
      <GridCellExpand
        value={params.value || ""}
        width={params.colDef.computedWidth}
      />
    );
  }

  renderCellExpand.propTypes = {
    /**
     * The column of the row that the current cell belongs to.
     */
    colDef: PropTypes.object.isRequired,
    /**
     * The cell value.
     * If the column has `valueGetter`, use `params.row` to directly access the fields.
     */
    value: PropTypes.string,
  };

  var cols = [
    { field: "name", headerName: "Dish Name", width: 150, editable: true },
    { field: "cost", headerName: "Dish Price", width: 100, editable: true },
    {
      field: "description",
      headerName: "Dish description",
      width: 250,
      editable: true,
      renderCell: renderCellExpand,
    },
    { field: "inStock", headerName: "In stock", width: 100, editable: true },
    {
      field: "imageUrl",
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
  const [rows, setRows] = React.useState([]);
  useEffect(() => {
    console.log(props.data);
    setRows(props.data.inventory);
    setVendorId(props.data.vendorId);
  }, [props]);
  const addImage = (e, params) => {
    var url = URL.createObjectURL(e.target.files[0]);
    var tempRows = JSON.parse(JSON.stringify(rows));
    var objIndex = tempRows.findIndex((obj) => obj.id == params.row.id);
    tempRows[objIndex].imageUrl = url;
    tempRows[objIndex].imageIndex = menuImage.length;
    setMenuImage(menuImage.concat(e.target.files[0]));
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
      id: tempRows.length !== 0 ? tempRows[tempRows.length - 1].id + 1 : 1,
      name: "Chicken Dum Biryani",
      cost: "300",
      description: "",
      inStock: "true",
    });
    setRows(tempRows);
  };

  const updateVendorMenu = async (rows) => {
    let formData = new FormData();
    var index = 0;
    for (var i in rows) {
      console.log(rows.at(i).imageIndex);
      if (
        (rows.at(i).imageIndex || rows.at(i).imageIndex == 0) &&
        rows.at(i).imageIndex != -1
      ) {
        var imageIndex = rows.at(i).imageIndex;
        console.log(menuImage.at(imageIndex));
        formData.append(
          "images",
          menuImage.at(imageIndex),
          menuImage.at(imageIndex).name
        );
        rows.at(i).imageIndex = index;
        index++;
      } else {
        rows.at(i).imageIndex = -1;
      }
    }
    formData.append("menu", JSON.stringify(rows));
    formData.append("vendorId", vendorId);
    setMenuImage([]);
    var response = await Fetch({
      route: "/api/v1/vendor/updateMenu",
      type: "POST",
      header: {
        Authorization: Cookies.get("vendor token")
          ? Cookies.get("vendor token")
          : "",
      },
      body: formData,
    });
    setMenuMessage(response);
    setOpen(true);
  };
  const submitData = () => {
    if (apiRef.current == null) {
      setMenuMessage({ success: false, message: "Please enter the menu" });
      setOpen(true);
      return;
    }
    var receivedRows = apiRef.current.getRowModels();
    receivedRows = convertMapToRows(receivedRows);
    updateVendorMenu(rows);
    console.log(rows == receivedRows);
  };

  return (
    <>
      <div>
        {rows && (
          <>
            <Box sx={{ width: "100%" }}>
              <Collapse in={open}>
                <Alert
                  severity={menuMessage.success ? "success" : "error"}
                  action={
                    <IconButton
                      aria-label="close"
                      size="small"
                      onClick={() => {
                        setMenuMessage("");
                        setOpen(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                  sx={{ mb: 2 }}
                >
                  {menuMessage.message}
                </Alert>
              </Collapse>
            </Box>
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
          </>
        )}
        <Box textAlign="center">
          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={btnstyle}
            onClick={submitData}
          >
            Submit Data
          </Button>
        </Box>
      </div>
    </>
  );
}

export default VendorMenu;
