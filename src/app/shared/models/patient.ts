import { base, transform } from "./base";

export class Patient {
  id: any = "patientId";
  firstName: any = "firstName";
  lastName: any = "lastName";

  static new(data: any = {}): Patient {
    return Object.assign({}, base(data, this));
  }
  static transform(data: any = {}) {
    return Object.assign({}, transform(data, this));
  }
}
