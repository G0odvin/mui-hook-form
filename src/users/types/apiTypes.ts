type Create = {
  variant: 'create',
};

type Update = {
  variant: 'update',
  id: string,
}

export type Common = {
  email: string,
  name: string,
  states: string[],
  languagesSpoken: string[],
  gender: string,
  skills: string[],
  registrationDateTime: Date,
  formEmploymentPeriod: Date[],
  salaryRange: number[],
  isTeacher: boolean,
  students: {
    name: string,
  }[],
};

export type ApiCreateEdit = Common & (Create | Update);
export type ApiGet = Common & Update;