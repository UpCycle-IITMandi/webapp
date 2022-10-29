import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import {
  Box,
  Modal,
  Paper,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import { Card, CardActions, CardContent, CardMedia } from "@mui/material";
import AddVendorForm from "../superuser/subcomponents/AddVendorForm";

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

function EditVendor(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  var data = {
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
  };
  return (
    <div>
      <Button onClick={handleOpen}>Edit Profile</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AddVendorForm data={data} />
        </Box>
      </Modal>
    </div>
  );
}

export default EditVendor;
