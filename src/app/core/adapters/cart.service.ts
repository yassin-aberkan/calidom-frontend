import { Injectable } from '@angular/core';
import {Cart} from "../models/cart";
import {HttpProductGateway} from "./http-product.gateway";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private _cartItems: Cart[] = [];


  constructor() {
    this.loadCart();
  }

  get cartItems() {
    return this._cartItems;
  }
  addToCart(productId: number, quantity: number): void {
    const existingCartItem = this.cartItems.find(item => item.productId === productId);

    if (existingCartItem) {
      existingCartItem.quantity = quantity;
    } else {
      this.cartItems.push({ productId, quantity });
    }

    this.saveCart();
  }

  removeFromCart(productId: number): void {
    const index = this.cartItems.findIndex(item => item.productId == productId);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
      this.saveCart();
    }
  }

  clearCart(): void {
    this._cartItems = [];
    this.saveCart();
  }

  getCartItems(): Cart[] {
    return this.cartItems;
  }

  private saveCart(): void {
    localStorage.setItem('cart-detail', JSON.stringify(this.cartItems));
  }

  private loadCart(): void {
    const cartItemsJson = localStorage.getItem('cart-detail');
    this._cartItems = cartItemsJson ? JSON.parse(cartItemsJson) : [];
  }

}
