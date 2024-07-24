type Create = {
  variant: 'create',
};

type Update = {
  variant: 'update',
  id: string,
};

// export type UserQueryData = {
//   variant: string;
//   id: string;
//   name: string;
//   email: string;
//   formEmploymentPeriod: Date[];
//   gender: string;
//   languagesSpoken: string[];
//   registrationDateTime: Date;
//   skills: string[];
//   states: string[];
//   salaryRange: number[];
//   students: {
//     name: string;
//   }[];
//   isTeacher: boolean;

// }

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