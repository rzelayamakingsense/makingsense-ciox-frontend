import { parseDate } from '@helpers/lang';
import { base, transform } from './base';

import { Patient } from './patient';

export class PatientsApi {
  items: Patient[] = [];
  pageNumber: any;
  pageSize: any;
  totalResults: any;

  static api(data: any = {}) {
    if (!Object.keys(data).length) return {};

    const { items, pageNumber, pageSize, totalResults } = data;

    return {
      ...data,
      ...{
        pageNumber,
        pageSize,
        totalResults,
        items: items.map((item: any) => {
          const patient = Patient.new(item);
          patient.birthDate = parseDate(patient.birthDate);
          patient.gender = Number(patient.gender);
          return patient;
        }),
      },
    };
  }

  static new(data: any = {}): PatientsApi {
    return Object.assign({}, base(PatientsApi.api(data), this));
  }
  static transform(data: any = {}) {
    return Object.assign({}, transform(data, this));
  }
}
