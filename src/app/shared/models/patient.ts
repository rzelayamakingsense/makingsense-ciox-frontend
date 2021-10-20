import { base, transform } from "./base";

export class Patient {
  id: any = "id";
  firstName: any = "firstName";
  lastName: any = "lastName";
  isActive: any = "isActive";
  birthDate: any = "birthDate";
  gender: any = "gender";

  static new(data: any = {}): Patient {
    return Object.assign({}, base(data, this));
  }
  static transform(data: any = {}) {
    return Object.assign({}, transform(data, this));
  }
}
