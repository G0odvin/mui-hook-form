import { FormControlLabel, Switch } from "@mui/material";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";

type Props<T extends FieldValues> = {
  name: Path<T>,
  label: string,
};

export function RHFSwitch<T extends FieldValues>({
  name,
  label,
}: Props<T>) {

  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormControlLabel 
        control={<Switch
          {...field}
          checked={field.value}
        />} 
        label={label}
        />
      )}
    />
  )


}


