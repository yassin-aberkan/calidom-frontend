import {Cart} from "../models/cart";

export abstract class CartGateway {
  abstract getCartItems(): Cart[];
  abstract addToCart(productId: number, quantity: number): void;
  abstract removeFromCart(productId: number): void;
  abstract clearCart(): void;
}
