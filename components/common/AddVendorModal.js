import React, { useEffect, useState } from "react";
import { Modal, Box, Typography, Button, TextField } from "@mui/material";
import AddEditVendorForm from "./AddEditVendorForm";
import style from "../../styles/modalStyle.json";
import CloseIcon from "@mui/icons-material/Close";

function AddVendorModal({ updateFunction }) {
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  return (
    <div>
      <Button onClick={handleOpen} color="inherit" >Add Vendor</Button>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div style={{ "padding-bottom": "20px" }}>
            <span  style={{"fontWeight":"bold","fontSize": "large"}}>VENDOR'S DETAILS</span>
            <span style={{ float: "right" }}>
              <CloseIcon onClick={handleClose} />
            </span>
          </div>

          <AddEditVendorForm   onClose={handleClose} updateFunction={updateFunction} />
        </Box>
      </Modal>
    </div>
  );
}

export default AddVendorModal;
