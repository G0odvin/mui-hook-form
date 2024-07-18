import { Slider } from "@mui/material";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";

type Props<T extends FieldValues> = {
  name: Path<T>,
};

export function RHFSlider<T extends FieldValues>({
  name
}: Props<T>) {

  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <Slider
          value={value}
          onChange={(_, newValue) => {
            if (newValue) {
              onChange(newValue)
            }
          }}
          min={0}
          max={2000}
          valueLabelDisplay="auto"
        />
      )}
    />
  )
}