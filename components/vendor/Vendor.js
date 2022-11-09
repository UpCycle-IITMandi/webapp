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
import { useRouter } from "next/router";

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
  const Router = useRouter();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    console.log(props.data.vendorId);
    Router.push("/vendor/" + props.data.vendorId);
  };
  return (
    <div>
      <Card sx={{}}>
        <Carousel>
          {props.data.images.map((item, i) => (
            <Paper key={i}>
              <CardMedia component="img" height="200" image={item.pictureUrl} />
            </Paper>
          ))}
        </Carousel>
        <CardContent sx={{ height: "35vh" }}>
          <Typography gutterBottom variant="h5" component="div"   >
            {props.data.shopName}
          </Typography>
          <Typography
            component={"span"}
            variant="body2"
            color="text.secondary"
            lineHeight={"1.1"}
          >
            <p>{props.data.shopName}</p>
            <p>{props.data.ownerName}</p>
            <p>{props.data.upiId}</p>
            <p>{props.data.address}</p>
            <p>{props.data.message}</p>
          </Typography>
        </CardContent>
        <CardActions >
          <Button sx={{ "margin-left": "auto", "margin-right": "auto" }}  onClick={handleOpen}>Open</Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default Vendor;
