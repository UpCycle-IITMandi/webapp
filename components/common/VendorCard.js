import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Typography, Button, Modal, Box } from "@mui/material";
import { Card, CardActions, CardContent, CardMedia } from "@mui/material";
import { useRouter } from "next/router";
import style from "../../styles/modalStyle.json";
import AddEditVendorForm from "./AddEditVendorForm";

function VendorCard({ data, isEditable, updateFunction }) {
  console.log("Rendering vendor card", data.shopName);
  const Router = useRouter();
  const [openModal, setOpenModal] = React.useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleOpenPage = () => {
    Router.push("/vendor/" + data.vendorId);
  };
  return (
    <div>
      <Card sx={{}}>
        <Carousel>
          {data.images.map((item, i) => (
            <Paper key={i}>
              <CardMedia component="img" height="200" image={item.pictureUrl} />
            </Paper>
          ))}
        </Carousel>
        <CardContent sx={{ height: "35vh" }}>
          <Typography gutterBottom variant="h5" component="div">
            {data.shopName}
          </Typography>
          <Typography component={"span"} variant="body2" color="text.secondary" lineHeight={"1.1"}>
            <p>{data.shopName}</p>
            <p>{data.ownerName}</p>
            <p>{data.upiId}</p>
            <p>{data.address}</p>
            <p>{data.message}</p>
          </Typography>
        </CardContent>
        <CardActions>
          <Button sx={{ "margin-left": "auto", "margin-right": "auto" }} onClick={handleOpenPage}>
            Open as Vendor
          </Button>
          {isEditable ? <Button onClick={handleOpenModal}>Edit</Button> : null}
        </CardActions>
      </Card>
      {isEditable ? (
        <Modal open={openModal} onClose={handleCloseModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
          <Box sx={style}>
            <AddEditVendorForm method="edit" data={data} updateFunction={updateFunction} />
          </Box>
        </Modal>
      ) : null}
    </div>
  );
}

export default VendorCard;
