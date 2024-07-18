import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { Option } from "../types/Option";
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel } from "@mui/material";

type Props<T extends FieldValues> = {
  name: Path<T>,
  options: Option[],
  label: string
};

export function RHFCheckboxGroup<T extends FieldValues>({
  name,
  options,
  label,
}: Props<T>) {

  const { control } = useFormContext();


  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <FormControl error={!!error}>
          <FormLabel>
            {label}
          </FormLabel>
          <FormGroup>
            {options.map((option) => (
              <FormControlLabel
                key={option.id}
                value={option.id}
                label={option.label}
                control={<Checkbox 
                  checked={value.includes(option.id)}
                  onChange={ () => {
                    if (value.includes(option.id)) {
                      onChange((value as string[]).filter(item => item !== option.id))
                    } else {
                      onChange([...value, option.id])
                    }
                  }}
                   />}
              />
            ))}
          </FormGroup>
          <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
      )}
    >
    </Controller>
  )
}