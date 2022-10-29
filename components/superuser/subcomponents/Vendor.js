import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useLocation } from "react-router-dom";
import {
  Box,
  Modal,
  Paper,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import { Card, CardActions, CardContent, CardMedia } from "@mui/material";
import AddVendorForm from "./AddVendorForm";
import { Link } from 'react-router-dom';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Vendor(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // const [editing, setEditing] = React.useState(false);
  // const [data, setData] = React.useState(props.data);
  // const handleEditClick = () => setEditing(true);
  // const handleUpdateClick = () => {
  //   setEditing(false);
  //   // Make API call to update the the
  // };

  return (
    <div>
      <Card sx={{}}>
        <Carousel>
          {props.data.images.map((item, i) => (
            <Paper key={i}>
              <CardMedia component="img" height="280" image={item} />
            </Paper>
          ))}
        </Carousel>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" >
            {props.data.shopName}
          </Typography>
          <Typography component={"span"} variant="body2" color="text.secondary">
            <p>{props.data.shopName}</p>
            <p>{props.data.ownerName}</p>
            <p>{props.data.upiId}</p>
            <p>{props.data.address}</p>
            <p>{props.data.message}</p>
           
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={handleOpen}>Edit</Button>
          {/* <Button
            size="small"
            onClick={editing ? handleUpdateClick : handleEditClick}
          >
            {editing ? "Update" : "Edit"}
          </Button> */}
        </CardActions>
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AddVendorForm data={props.data} />
        </Box>
      </Modal>
    </div>
  );
}

export default Vendor;