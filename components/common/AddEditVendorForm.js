import React, { useEffect, useState } from "react";
import { Paper, Typography, Button, fabClasses } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { CardMedia } from "@mui/material";
import { useForm } from "react-hook-form";
import FormInputText from "../form-components/FormInputText";
import Fetch from "../../common/Fetch";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { Switch, FormControlLabel } from "@mui/material";

var defaultValues = {
  shopName: "",
  ownerName: "",
  upiId: "",
  address: "",
  contactNumber: "",
  password: "",
  isOpen: false,
  orders: [],
  inventory: [],
  images: [],
};

export default function AddEditVendorForm({
  method = "add",
  data = defaultValues,
  onClose,
  updateFunction,
}) {
  const [isOpen, setIsOpen] = useState(data.isOpen);
  const Router = useRouter();
  const [uploadedImages, setUploadedImages] = React.useState([]);
  const { handleSubmit, reset, control, setValue, register } = useForm({
    defaultValues: data,
  });

  const onSubmit = async (submitData) => {
    // Create form data, send post request, receive updated object in response, set it as vendorData
    const formData = new FormData();
    for (const name in submitData) {
      if (name !== "images" && name !== "isOpen") {
        formData.append(name, submitData[name]);
      }
    }
    formData.append("isOpen", isOpen);
    var fileList = submitData["images"];
    if (fileList.length > 0 && fileList[0].lastModified) {
      for (var i = 0; i < fileList.length; i++) {
        const file = fileList.item(i);
        formData.append("images", file, file.name);
      }
    } else {
      formData.append("images", JSON.stringify(data.images));
    }
    var response = await Fetch({
      header: {
        Authorization: Cookies.get("super user token")
          ? Cookies.get("super user token")
          : Cookies.get("vendor token"),
      },
      route: method === "add" ? "/api/v1/vendor/add" : "/api/v1/vendor/update",
      type: "POST",
      body: formData,
    });
    updateFunction(response.vendor);
    onClose();
  };

  const handleUpload = async (event) => {
    var fileList = event.target.files;
    var newUploadedImages = [];
    for (var i = 0; i < fileList.length; i++) {
      newUploadedImages.push(URL.createObjectURL(fileList[i]));
    }
    setUploadedImages(newUploadedImages);
  };
  const changeOpenStatus = (e) => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <form>
        {/* <Typography mt={2}>{contactNumber}</Typography> */}
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
        <FormInputText name={"vendorId"} control={control} label={"VendorId"} />
        <FormInputText name={"upiId"} control={control} label={"UPI Id"} />
        <FormInputText name={"address"} control={control} label={"Address"} />
        <FormInputText
          name={"contactNumber"}
          control={control}
          label={"contactNumber"}
        />
        <FormInputText name={"password"} control={control} label={"Password"} />
        <FormControlLabel
          name={"isOpen"}
          labelPlacement="start"
          label={"Is Open"}
          checked={isOpen}
          control={<Switch value="checked" color="primary" />}
          onChange={(e) => changeOpenStatus(e)}
        />
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
        {data.images.length > 0 ? (
          <Typography mt={2}>Existing Images</Typography>
        ) : null}
        <Carousel>
          {data.images.map((item, i) => (
            <Paper key={i}>
              <CardMedia component="img" height="140" image={item.pictureUrl} />
            </Paper>
          ))}
        </Carousel>
        {uploadedImages.length > 0 ? (
          <Typography mt={2}>New uploaded Images</Typography>
        ) : null}
        <Carousel>
          {uploadedImages.map((item, i) => (
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
