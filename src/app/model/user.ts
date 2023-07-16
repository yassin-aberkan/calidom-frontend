import {Address} from "./address";
import {GenderEnum} from "./enum/gender.enum";
import {RoleEnum} from "./enum/role.enum";

export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: RoleEnum;
  dateBirth: Date;
  gender?: GenderEnum;
  mainAddress?: Address;
}
