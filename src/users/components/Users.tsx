import { useFormContext } from 'react-hook-form';
import { Autocomplete, Stack, TextField, Typography } from '@mui/material';
import { Schema } from '../types/schema';
import { RHFAutocomplite } from '../../components/RHFAutocomplite';
import { RHFToggleButtonGroup } from '../../components/RHFToggleButton';
import { RHFRadioGroup } from '../../components/RHFRadioGroup';
import { RHFCheckboxGroup } from '../../components/RHFCheckboxGroup';
import { RHFDateTimePicker } from '../../components/RHFDateTimePicker';
import { RHFDateRangePicker } from '../../components/RHFDateRangePicker';
import { RHFSlider } from '../../components/RHFSlider';
import { RHFSwitch } from '../../components/RHFSwitch';
import { RHFTextField } from '../../components/RHFTextField';
// import { useStates } from '../services/queries';

const cities = [
  { label: 'New York', id: '1' },
  { label: 'Rome', id: '2' },
  { label: 'London', id: '3' },
  { label: 'Istanbul', id: '4' },
  { label: 'Paris', id: '5' },
];

const languages = [
  {
    "id": "1",
    "label": "English"
  },
  {
    "id": "2",
    "label": "Germany"
  },
  {
    "id": "3",
    "label": "Spanish"
  }
];

const genders = [
  {
    "id": "1",
    "label": "Male"
  },
  {
    "id": "2",
    "label": "Female"
  }
];

const skills = [
  {
    "id": "1",
    "label": "Productive"
  },
  {
    "id": "2",
    "label": "Creative"
  },
  {
    "id": "3",
    "label": "Agile"
  },
  {
    "id": "4",
    "label": "Problem solver"
  }
];

export const Users = () => {
  // const states = useStates()
  // states.data
  //const languagesQuery = useLanguages()
  // const gendersQuery = useGenders();
  // const skilsQuery =   useSkils()

  const {
    register,
    formState: { errors },
  } = useFormContext<Schema>();

  return (
    <>
      <Stack sx={{ gap: 2 }} style={{ width: 800 }}>
        <RHFTextField<Schema> name="name" label="Name" />
        {/* <TextField {...register('name')} label="Name" error={!!errors.name}
          helperText={errors.name?.message}
        /> */}
        <RHFTextField<Schema> name="email" label="Email" />
        <TextField {...register('email')} label="Email"
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        {/* <Autocomplete
          options={[{ id: '1', label: 'Texas' }]}
          renderInput={(params) => <TextField {...params} label="States" />}
        /> */}
        <RHFAutocomplite<Schema> name="states" label='States' options={cities} />
        <RHFToggleButtonGroup<Schema> name='languagesSpoken' options={languages} />
        <RHFRadioGroup<Schema> name='gender' label='Gender' options={genders} />
        <RHFCheckboxGroup<Schema> name='skills' options={skills} label='Skills' />
        <RHFDateTimePicker<Schema> name='registrationDateTime' label='Registration Date & Time' />
          <Typography>Former Employment Period:</Typography>
          <RHFDateRangePicker<Schema> name='formEmploymentPeriod' />
          <Typography>Salary Range</Typography>
          <RHFSlider<Schema> name='salaryRange' />
          <RHFSwitch<Schema> name='isTeacher' label='Are You a Teacher' />
      </Stack>

    </>

  )
}
