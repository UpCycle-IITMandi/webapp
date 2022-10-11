import React, { useEffect, useState } from "react";
import { Modal, Box, Typography, Button, TextField } from "@mui/material";
import { Controller } from "react-hook-form";

export default function FormInputText({ name, control, label }) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <TextField
          style={{ marginBottom: "6px", width: "100" }}
          onChange={onChange}
          value={value}
          label={label}
        />
      )}
    />
  );
}
