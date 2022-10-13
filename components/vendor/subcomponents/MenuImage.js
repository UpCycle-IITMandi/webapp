import React, { useEffect, useState } from "react";
import {
  Box,
  Modal,
  Paper,
  Typography,
  Button,
  TextField,
} from "@mui/material";

function MenuImage(props) {
  return <CardMedia component="img" height="140" image={props.src} />;
}

export default MenuImage;
