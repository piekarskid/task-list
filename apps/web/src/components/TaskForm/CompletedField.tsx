import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Typography,
} from "@mui/material";

type CompletedFieldProps = {
  defaultChecked: boolean;
};

export const CompletedField = (props: CompletedFieldProps) => {
  return (
    <FormControl>
      <FormControlLabel
        id="completed"
        name="completed"
        control={<Checkbox {...props} />}
        label={<Typography variant="body2">Completed</Typography>}
      />
    </FormControl>
  );
};
