import {GenderEnum} from "./enum/gender.enum";

export interface RegisterRequest {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  dateBirth: Date;
  gender: GenderEnum;
}
