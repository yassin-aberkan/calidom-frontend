import {Product} from "./product";

export interface HeatingProduct extends Product {
  model: string;
  power: number;
  pressureMax: number;
  temperatureMax: number;
  height: number;
  width: number;
  depth: number;
}
