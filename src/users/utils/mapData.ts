import { ApiCreateEdit, Common } from "../types/apiTypes";
import { Schema } from "../types/schema";

export function mapData(data: Schema): ApiCreateEdit {
  const common: Common = {
    email: data.email,
    name: data.name,
    states: data.states,
    languagesSpoken: data.languagesSpoken,
    gender: data.gender,
    skills: data.skills,
    registrationDateTime: data.registrationDateAndTime,
    formEmploymentPeriod: [
      data.formerEmploymentPeriod[0],
      data.formerEmploymentPeriod[1],
    ],
    salaryRange: data.salaryRange,
    isTeacher: data.isTeacher,
    students: data.isTeacher === true ? data.students : [],
  }

  switch (data.variant) {
    case 'create': {
      return { ...common, variant: data.variant };
    }
    case 'update': {
      return { ...common, id: data.id, variant: data.variant };
    }
  }

}