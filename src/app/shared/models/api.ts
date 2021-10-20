import { base, transform } from "./base";

import { Patient } from "./patient";

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
        items: items.map((patient) => Patient.new(patient)),
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
