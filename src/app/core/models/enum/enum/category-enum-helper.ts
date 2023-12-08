import {faFaucet, faFire, faQuestion, faTemperatureFull} from "@fortawesome/free-solid-svg-icons";
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import {CategoryEnum} from "./category.enum";

export class CategoryEnumHelper{

  private static ICON_MAP : Record<CategoryEnum, IconDefinition> = {
    [CategoryEnum.HEATING]: faFire,
    [CategoryEnum.EQUIPMENT]: faTemperatureFull,
    [CategoryEnum.SANITARY]: faFaucet,
    [CategoryEnum.INVALID]: faQuestion,
  };

  static getCategoryEnum(value: string): CategoryEnum {
    switch (value) {
      case CategoryEnum.EQUIPMENT:
        return CategoryEnum.EQUIPMENT;
      case CategoryEnum.HEATING:
        return CategoryEnum.HEATING;
      case CategoryEnum.SANITARY:
        return CategoryEnum.SANITARY;
      default:
        return CategoryEnum.INVALID;
    }
  }

  static getIcon(value: string): IconDefinition{
    const key = Object.keys(CategoryEnum).find(k => k === value);
    if (key) {
      return CategoryEnumHelper.ICON_MAP[key as CategoryEnum];
    } else {
      return faQuestion;
    }
  }

}
