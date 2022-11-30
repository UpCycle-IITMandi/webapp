import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Typography, Button, Modal, Box } from "@mui/material";
import { Card, CardActions, CardContent, CardMedia } from "@mui/material";
import { useRouter } from "next/router";
import style from "../../styles/modalStyle.json";
import CloseIcon from "@mui/icons-material/Close";
import AddEditVendorForm from "./AddEditVendorForm";
import _ from "lodash";

function VendorCard({ data, isEditable, updateFunction, openAsVendor = true }) {
  if (_.isEmpty(data)) return <></>;
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
          <Typography
            component={"span"}
            variant="body2"
            color="text.secondary"
            lineHeight={"1.1"}
          >
            <p>{data.shopName}</p>
            <p>{data.ownerName}</p>
            <p>{data.upiId}</p>
            <p>{data.address}</p>
            <p>{data.message}</p>
          </Typography>
        </CardContent>
        <CardActions>
          {openAsVendor ? (
            <Button
              sx={{ "margin-left": "auto", "margin-right": "auto" }}
              onClick={handleOpenPage}
            >
              Open as Vendor
            </Button>
          ) : null}
          {isEditable ? <Button onClick={handleOpenModal}>Edit</Button> : null}
        </CardActions>
      </Card>
      {isEditable ? (
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div style={{ "padding-bottom": "20px" }}>
              <span style={{ fontWeight: "bold", fontSize: "large" }}>
                VENDOR'S DETAILS
              </span>
              <span style={{ float: "right" }}>
                <CloseIcon onClick={handleCloseModal} />
              </span>
            </div>
            <AddEditVendorForm
              method="edit"
              data={data}
              updateFunction={updateFunction}
            />
          </Box>
        </Modal>
      ) : null}
    </div>
  );
}

export default VendorCard;
