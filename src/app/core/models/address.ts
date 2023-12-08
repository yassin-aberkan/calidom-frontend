import {Country} from "./country";

export interface Address {
  id?: number;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: Country;
}
