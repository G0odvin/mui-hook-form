import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { Option } from "../types/Option";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

type Props<T extends FieldValues> = {
  name: Path<T>,
  options: Option[],
}
export function RHFToggleButtonGroup<T extends FieldValues>({
  name,
  options,
}: Props<T>) {

  const { control } = useFormContext();


  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value, ...restField } }) => (
        <ToggleButtonGroup
          onChange={(_, newValue) => {
            if (newValue.length) {
              onChange(newValue)
            }
          }}
          value={value.length ? value : [options[0].id]}
          {...restField}
        >
          {options?.map((item) => (
            <ToggleButton key={item.id} value={item.id} >
              {item.label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      )}
    >
    </Controller>
  )
}