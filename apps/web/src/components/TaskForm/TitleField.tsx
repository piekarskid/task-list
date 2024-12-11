import { FormControl, TextField } from "@mui/material";

type TitleFieldProps = {
  defaultValue?: string;
};

export const TitleField = (props: TitleFieldProps) => {
  return (
    <FormControl>
      <TextField label="Title" id="title" name="title" {...props} />
    </FormControl>
  );
};
