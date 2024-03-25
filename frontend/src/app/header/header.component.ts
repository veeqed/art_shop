import { Component } from '@angular/core';
import { ProductService } from '../shared/product.service';
import { CartService } from "../shared/cart.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  menuWidth = '0px';
  cartCount: number;

  constructor(private CartService: CartService) {
    this.CartService.cartCount$.subscribe(
      count => {
        // this runs everytime the count changes
        this.cartCount = count;
      }
    )
  
    this.CartService.setCartCount(0); // init to 0?
  }

  ngOnInit() {

  }
  
  public openMenu() {
    this.menuWidth = "250px";
  }

  public closeMenu() {
    this.menuWidth = "0px";
  }

}
