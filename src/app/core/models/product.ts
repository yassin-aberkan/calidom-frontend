import {ProductEnum} from "./enum/enum/product.enum";
import {CategoryEnum} from "./enum/enum/category.enum";
import {LanguageEnum} from "./enum/enum/languague-enum";

export interface Product {
  id: number;
  name: string;
  descriptions: { [lang in LanguageEnum]: string };
  brand: string;
  price: number;
  productType: ProductEnum;
  categoryType: CategoryEnum;
  imageUrl: string;
  logoUrl: string;
  expiredDate: Date;
}
