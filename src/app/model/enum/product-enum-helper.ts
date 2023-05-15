import {CategoryEnum} from "./category.enum";
import {ProductEnum} from "./product.enum";

export class ProductEnumHelper{
  static getProductEnum(value: string): ProductEnum {
    switch (value) {
      case ProductEnum.GAZ_WALL_HEATING:
        return ProductEnum.GAZ_WALL_HEATING;
      case ProductEnum.GAZ_FLOOR_HEATING:
        return ProductEnum.GAZ_FLOOR_HEATING;
      case ProductEnum.OIL_FLOOR_HEATING:
        return ProductEnum.OIL_FLOOR_HEATING;
      case ProductEnum.BOILER:
        return ProductEnum.BOILER;
      case ProductEnum.PELLET_HEATER:
        return ProductEnum.PELLET_HEATER;
      case ProductEnum.HEATER:
        return ProductEnum.HEATER;
      default:
        return ProductEnum.INVALID;
    }
  }
}
