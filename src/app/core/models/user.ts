import {Address} from "./address";
import {GenderEnum} from "./enum/enum/gender.enum";
import {RoleEnum} from "./enum/enum/role.enum";

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
