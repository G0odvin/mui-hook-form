import { SubmitHandler, useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { Autocomplete, Button, Container, List, ListItem, ListItemButton, ListItemText, ListSubheader, Stack, TextField, Typography } from '@mui/material';
import { defaultValues, Schema } from '../types/schema';
import { RHFAutocomplite } from '../../components/RHFAutocomplite';
import { RHFToggleButtonGroup } from '../../components/RHFToggleButton';
import { RHFRadioGroup } from '../../components/RHFRadioGroup';
import { RHFCheckboxGroup } from '../../components/RHFCheckboxGroup';
import { RHFDateTimePicker } from '../../components/RHFDateTimePicker';
import { RHFDateRangePicker } from '../../components/RHFDateRangePicker';
import { RHFSlider } from '../../components/RHFSlider';
import { RHFSwitch } from '../../components/RHFSwitch';
import { RHFTextField } from '../../components/RHFTextField';
import { useEffect } from 'react';
import { useUser, useUsers } from '../services/queries';
import { useCreateUser, useEditUser } from '../services/mutations';
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

  const users = useUsers();

  const {
    register,
    control,
    unregister,
    reset,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useFormContext<Schema>();

  const isTeacher = useWatch({ control, name: 'isTeacher' });
  const variant = useWatch({ control, name: 'variant' });

  const { append, fields, remove, replace } = useFieldArray({
    control,
    name: 'students'
  });

  const id = useWatch({ control, name: 'id' });
  const userQuery= useUser(id);

  const handleUserClick = (id: string) => {
    setValue('id', id)
  };

  const createUserMutation = useCreateUser();
  const editUserMutation = useEditUser();

  const onSubmit: SubmitHandler<Schema> = (data) => {
    if(variant=== 'create') {
      createUserMutation.mutate(data)
    } else {
      editUserMutation.mutate(data);
    }
  }

  useEffect(() => {
    if (!isTeacher) {
      replace([]);
      unregister('students');
    }
  }, [isTeacher, replace, unregister]);

  useEffect(() => {
    if (userQuery.data) {

      reset(userQuery.data);
    }
  }, [reset, userQuery.data]);

  return (
    <>
      <Container maxWidth="sm" component='form' onSubmit={handleSubmit(onSubmit)}>
        <Stack sx={{ flexDirection: 'row', gap: 2 }}>
        <List subheader={<ListSubheader>Users</ListSubheader>}>
          {users.data?.map((user) => (
            <ListItem disablePadding key={user.id}>
              <ListItemButton onClick={() => handleUserClick(user.id)}
              selected={user.id === id}
              >
                <ListItemText primary={user.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Stack sx={{ gap: 2 }} >
          <RHFTextField<Schema> name="name" label="Name" />
          {/* <TextField {...register('name')} label="Name" error={!!errors.name}
          helperText={errors.name?.message}
        /> */}
          <RHFTextField<Schema> name="email" label="Email" />
          <TextField {...register('email')} label="Email"
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <Autocomplete
            options={[{ id: '1', label: 'Texas' }]}
            renderInput={(params) => <TextField {...params} label="States" />}
          />
          <RHFAutocomplite<Schema> name="states" label='States' options={cities} />
          <RHFToggleButtonGroup<Schema> name='languagesSpoken' options={languages} />
          <RHFRadioGroup<Schema> name='gender' label='Gender' options={genders} />
          <RHFCheckboxGroup<Schema> name='skills' options={skills} label='Skills' />
          <RHFDateTimePicker<Schema> name='registrationDateAndTime' label='Registration Date & Time' />
          <Typography>Former Employment Period:</Typography>
          <RHFDateRangePicker<Schema> name='formerEmploymentPeriod' />
          <Typography>Salary Range</Typography>
          <RHFSlider<Schema> name='salaryRange' />
          <RHFSwitch<Schema> name='isTeacher' label='Are You a Teacher' />

          {isTeacher && (
            <button onClick={() => append({ name: '' })} type='button'>Add new student</button>
          )}

          {fields.map((field, index) => (
            <>
              <RHFTextField name={`students.${index}.name`} label="Name" key={field.id} />
              <Button color='error' onClick={() => remove(index)} type='button'>Remove</Button>
            </>
          ))}
        </Stack>

        <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Button variant='contained' type='submit'>{variant === 'create' ? 'New User' : 'Update User'}</Button>
          <Button onClick={() => reset(defaultValues)}>Reset form</Button>
        </Stack>
        </Stack>

      </Container>
    </>

  )
}
