import React, { useEffect, useState } from "react";
import { Paper, Typography, Button } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { CardMedia } from "@mui/material";
import { useForm } from "react-hook-form";
import FormInputText from "../form-components/FormInputText";
import Fetch from "../../common/Fetch";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

var defaultValues = {
  shopName: "",
  ownerName: "",
  upiId: "",
  address: "",
  contactNumber: "",
  password: "",
  images: [],
};

export default function AddEditVendorForm({ method = "add", data = defaultValues, updateFunction }) {
  const Router = useRouter();
  const [uploadedImages, setUploadedImages] = React.useState([]);
  const { handleSubmit, reset, control, setValue, register } = useForm({ defaultValues: data });

  const onSubmit = async (submitData) => {
    // Create form data, send post request, receive updated object in response, set it as vendorData
    const formData = new FormData();
    for (const name in submitData) {
      if (name !== "images") {
        formData.append(name, submitData[name]);
      }
    }
    var fileList = submitData["images"];
    console.log(fileList);
    if (fileList.length > 0 && fileList[0].lastModified) {
      for (var i = 0; i < fileList.length; i++) {
        const file = fileList.item(i);
        formData.append("images", file, file.name);
      }
    }
    var response = await Fetch({
      header: {
        Authorization: Cookies.get("super user token") ? Cookies.get("super user token") : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InBhc3N3b3JkIjoiaGVsbG8ifSwiaWF0IjoxNjY4MTE3MDg3fQ.o-eqcZ8yTfD8grMjsEsHymx_RXlw0HLGAuWz2QxuP3w",
      },
      route: method === "add" ? "/api/v1/vendor/add" : "/api/v1/vendor/update",
      type: "POST",
      body: formData,
    });
    updateFunction(response.vendor);
  };

  const handleUpload = async (event) => {
    var fileList = event.target.files;
    var newUploadedImages = [];
    for (var i = 0; i < fileList.length; i++) {
      newUploadedImages.push(URL.createObjectURL(fileList[i]));
    }
    setUploadedImages(newUploadedImages);
  };

  return (
    <div>
      <form>
        {/* <Typography mt={2}>{contactNumber}</Typography> */}
        <FormInputText name={"shopName"} control={control} label={"Shop Name"} />
        <FormInputText name={"ownerName"} control={control} label={"OwnerName"} />
        <FormInputText name={"upiId"} control={control} label={"UPI Id"} />
        <FormInputText name={"address"} control={control} label={"Address"} />
        <FormInputText name={"contactNumber"} control={control} label={"contactNumber"} />
        <FormInputText name={"password"} control={control} label={"Password"} />
        <div>
          <Button variant="contained" component="label" onChange={(e) => handleUpload(e)}>
            Upload Vendor Images
            <input hidden multiple type="file" {...register("images")} />
          </Button>
        </div>
        {data.images.length > 0 ? <Typography mt={2}>Existing Images</Typography> : null}
        <Carousel>
          {data.images.map((item, i) => (
            <Paper key={i}>
              <CardMedia component="img" height="140" image={item.pictureUrl} />
            </Paper>
          ))}
        </Carousel>
        {uploadedImages.length > 0 ? <Typography mt={2}>New uploaded Images</Typography> : null}
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
