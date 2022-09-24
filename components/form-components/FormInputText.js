import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";
import React from "react";

export default function FormInputText({ name, control, label }) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <TextField onChange={onChange} value={value} label={label} />
      )}
    />
  );
}
