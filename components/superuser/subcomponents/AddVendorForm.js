import React, { useEffect, useState } from "react";
import {
  Box,
  Modal,
  Paper,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { Card, CardActions, CardContent, CardMedia } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import FormInputText from "../../form-components/FormInputText";
import Fetch from "../../../common/Fetch";
import Cookies from "js-cookie"

var defaultValues = {
  shopName: "",
  ownerName: "",
  upiId: "",
  address: "",
  contactNumber: "",
  password: "",
  images: [],
};

export default function AddVendorForm(props) {
  var values;
  if (props.method === "add") values = defaultValues;
  else values = props.data;

  const [data, setData] = useState(values);
  const [images, setImages] = useState([]);
  const [contactNumber, setcontactNumber] = useState("");

  const methods = useForm({ defaultValues: data });
  const { handleSubmit, reset, control, setValue, register } = methods;

  useEffect(() => {
    setImages(data.images);
  }, [data.images]);

  const onSubmit = async (submitData) => {
    const formData = new FormData();
    for (const name in submitData) {
      if (name !== "images") {
        formData.append(name, submitData[name]);
        values[name] = submitData[name];
      }
    }
  
    var fileList = submitData["images"];
    for (var i = 0; i < fileList.length; i++) {
      const file = fileList.item(i);
      formData.append("images", file, file.name);
    }
    values.images = images;
    var response = await Fetch({
     header:{
      Authorization: Cookies.get("super user token") ? Cookies.get("super user token") : "",
     },
      route:
        props.method === "add"
          ? "/api/v1/bazaar/addVendor"
          : "/api/v1/bazaar/updateVendor",
      type: "POST",
      body: formData,
    });
    console.log(response);
    setData(values);
  };

  const handleUpload = async (event) => {
    console.log("Inside handle upload function");
    var fileList = event.target.files;
    var tempImages = [];
    for (var i = 0; i < fileList.length; i++) {
      const file = fileList.item(i);
      var url = URL.createObjectURL(fileList[i]);
      tempImages.push(url);
      setImages(tempImages);
    }
  };

  return (
    <div>
      <form>
        <Typography mt={2}>{contactNumber}</Typography>
        <FormInputText
          name={"shopName"}
          control={control}
          label={"Shop Name"}
        />
        <FormInputText
          name={"ownerName"}
          control={control}
          label={"OwnerName"}
        />
        <FormInputText name={"upiId"} control={control} label={"UPI Id"} />
        <FormInputText name={"address"} control={control} label={"Address"} />
        <FormInputText name={"contactNumber"} control={control} label={"contactNumber"} />
        <FormInputText name={"password"} control={control} label={"Password"} />
        <div>
          <Button
            variant="contained"
            component="label"
            onChange={(e) => handleUpload(e)}
          >
            Upload Vendor Images
            <input hidden multiple type="file" {...register("images")} />
          </Button>
        </div>
        <Typography mt={2}>Uploaded Images</Typography>
        <Carousel>
          {images.map((item, i) => (
            <Paper key={i}>
              <CardMedia component="img" height="140" image={item} />
            </Paper>
          ))}
        </Carousel>
        <div>
          <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
        </div>
      </form>
    </div>
  );
}
