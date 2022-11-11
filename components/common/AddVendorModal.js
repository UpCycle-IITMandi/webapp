import React, { useEffect, useState } from "react";
import { Modal, Box, Typography, Button, TextField } from "@mui/material";
import AddEditVendorForm from "./AddEditVendorForm";
import style from "../../styles/modalStyle.json";

function AddVendorModal({ updateFunction }) {
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  return (
    <div>
      <Button onClick={handleOpen}>Add Vendor</Button>
      <Modal open={openModal} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <AddEditVendorForm updateFunction={updateFunction} />
        </Box>
      </Modal>
    </div>
  );
}

export default AddVendorModal;
