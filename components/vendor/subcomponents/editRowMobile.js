import React from "react";
import {
  Paper,
  Button,
  TextField,
  Switch,
  CardMedia,
  FormGroup,
  FormControlLabel,
  Stack,
} from "@mui/material";

function EditRowMobile({
  values,
  changeStockStatus,
  addImage,
  changeColOfRow,
}) {
  if (!values) return null;
  const rowId = React.useMemo(() => ({ row: { id: values.id } }));
  return (
    <Paper
      elevation={10}
      style={{
        padding: 20,
      }}
    >
      <Stack spacing={2}>
        <TextField
          variant="standard"
          InputLabelProps={{ shrink: true }}
          onChange={(e) => changeColOfRow("name", e.value, rowId)}
          value={values.name}
          label={"Dish Name"}
        />
        <TextField
          variant="standard"
          InputLabelProps={{ shrink: true }}
          onChange={(e) => changeColOfRow("cost", e.value, rowId)}
          value={values.cost}
          label={"Dish Price"}
        />
        <TextField
          multiline
          variant="standard"
          InputLabelProps={{ shrink: true }}
          onChange={(e) => changeColOfRow("description", e.value, rowId)}
          value={values.description}
          label={"Dish Description"}
        />
        <FormControlLabel
          control={
            <Switch
              onChange={(e) => changeStockStatus(e, rowId)}
              inputProps={{ "aria-label": "controlled" }}
              checked={values.inStock}
            />
          }
          label="In Stock"
        />
        <Stack>
          <CardMedia component="img" height="140" image={values.imageUrl} />
          <Button
            variant="contained"
            component="label"
            onChange={(e) => addImage(e, rowId)}
          >
            Edit Image
            <input hidden type="file" />
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
}

export default EditRowMobile;
