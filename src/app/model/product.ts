import {ProductEnum} from "./enum/product.enum";
import {CategoryEnum} from "./enum/category.enum";

export interface Product {
  id: number;
  name: string;
  description: string;
  brand: string;
  price: number;
  productType: ProductEnum;
  categoryType: CategoryEnum;
  imageUrl: string;
  logoUrl: string;
  expiredDate: Date;
}
