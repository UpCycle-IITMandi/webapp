import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { Button, Paper } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import FormInputText from "../../form-components/FormInputText";
import Typography from "@mui/material/Typography";
import Fetch from "../../../common/Fetch";

const defaultValues = {
  shopName: "",
  ownerName: "",
  upiId: "",
  address: "",
  message: "",
  password: "",
};

export default function AddVendorForm() {
  const methods = useForm({ defaultValues: defaultValues });
  const { handleSubmit, reset, control, setValue, register } = methods;
  const [message, setMessage] = useState("");
  const onSubmit = async (data) => {
    setMessage("");
    console.log("data", data);
    const formData = new FormData();
    for (const name in data) {
      formData.append(name, data[name]);
    }
    var response = await Fetch({
      route: "/addVendor",
      type: "POST",
      body: formData,
    });
    console.log(response);
    setMessage(response.message);
  };
  return (
    <form>
      <Typography mt={2}>{message}</Typography>
      <FormInputText name={"shopName"} control={control} label={"Shop Name"} />
      <FormInputText name={"ownerName"} control={control} label={"OwnerName"} />
      <FormInputText name={"upiId"} control={control} label={"UPI Id"} />
      <FormInputText name={"address"} control={control} label={"Address"} />
      <FormInputText name={"message"} control={control} label={"Message"} />
      <FormInputText name={"password"} control={control} label={"Password"} />
      <Button variant="contained" component="label">
        Upload
        <input hidden multiple type="file" {...register("file")} />
      </Button>
      <div>
        <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
        <Button onClick={() => reset()} variant={"outlined"}>
          Reset
        </Button>
      </div>
    </form>
  );
}
