import { Injectable } from "@angular/core";
import { Cart } from "./cart.model";
import { Product } from "./product.model";
import { ReplaySubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CartService {

    constructor() {}

    items: Array<Cart> = [];
    private cartCount = new ReplaySubject<number>(1);
    cartCount$ = this.cartCount.asObservable();

    setCartCount(count: number) {
        this.cartCount.next(count);
    }

    addToCart(addedItem: Cart) {
        this.items.push(addedItem);
        this.saveCart();
    }
    
    getItems() {
        return this.items;
    }

    getCartCount() {
        return this.items.length;
    } 

    loadCart(): void {
        this.items = JSON.parse(localStorage.getItem("cart_items") || '{}')?? [];
    }

    saveCart(): void {
        localStorage.setItem('cart_items', JSON.stringify(this.items)); 
    }

    clearCart() {
        this.items = [];

        localStorage.removeItem("cart_items")
    }

    removeItem(item: Cart) {
        
    }

    itemInCart(item: any): boolean {
        if (this.items.length == 0) {
            return false;
        }
        else
        {
            let found = false;

            for (let cartItem of this.items) {
                if (cartItem.product_code == item.product_code)
                {
                    found = true;
                }
            }

            return found;
        }
    }
}