import { FormControl, TextField } from "@mui/material";

type DescriptionFieldProps = {
  defaultValue?: string;
};

export const DescriptionField = (props: DescriptionFieldProps) => {
  return (
    <FormControl>
      <TextField
        label="Description"
        id="description"
        name="description"
        multiline
        rows={4}
        {...props}
      />
    </FormControl>
  );
};
