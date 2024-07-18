import { TextField } from "@mui/material";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";

type Props<T extends FieldValues> = {
  name: Path<T>,
  label: string,
}

export function RHFTextField<T extends FieldValues>({
  name,
  label,
}: Props<T>) {

  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <TextField {...field} error={!!error} helperText={error?.message} label={label} />
      )}
    >
    </Controller>
  )
 }