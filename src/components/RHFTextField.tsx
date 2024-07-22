import { TextField, TextFieldProps } from "@mui/material";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";

type Props<T extends FieldValues> = {
  name: Path<T>,
} & Pick<TextFieldProps, 'label'>

export function RHFTextField<T extends FieldValues>({
  name,
...props
}: Props<T>) {

  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <TextField {...field} error={!!error} helperText={error?.message} {...props} />
      )}
    >
    </Controller>
  )
 }