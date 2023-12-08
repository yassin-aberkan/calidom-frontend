import {LanguageEnum} from "./languague-enum";

export class LanguageEnumHelper{
  static getLanguageEnumEnum(value: string): LanguageEnum {
    switch (value) {
      case "EN" || "en":
        return LanguageEnum.EN;
      case "FR" || "fr":
        return LanguageEnum.FR;
      case "NL" || "nl":
        return LanguageEnum.NL;
      default:
        // Return a default language enum value or handle the case as needed
        return LanguageEnum.FR;
    }
  }
}
