import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { ProductService } from '../shared/product.service';
import { CartService } from "../shared/cart.service";
import { Product } from '../shared/product.model';
import { Cart } from '../shared/cart.model';
interface Item {
  icon: string;
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  items: Cart[] = [];
  product_code: any;
  product: Product;
  readonly imageUrl: string = "http://localhost:3000/images";
  formatter = new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB',
  minimumFractionDigits: 0 });

  private _numbers: number = 0;
  @Output() numbers = new EventEmitter<number>();

  constructor(private CartService: CartService
    , private route: ActivatedRoute
    , private ProductService: ProductService
    , private ActivatedRoute: ActivatedRoute) {

      this.product = {
        _id: "",
        product_code: "",
        product_name: "",
        image: this.imageUrl + "noimg.png",
        price: 0
      };
  }

  increaseNumbers() {
    this._numbers++;
    this.numbers.emit(this._numbers);
  }

  ngOnInit() {
    this.product_code = this.ActivatedRoute.snapshot.params['product_code'];

    this.getProduct(this.product_code);
    this.CartService.loadCart();
    this.items = this.CartService.getItems();
  }

  getProduct(code: any) {
		this.ProductService.getProduct(code).subscribe(res => {
			this.product = res as Product;
		});
	}

  addToCart(item: Product) {
    let cartItem = new Cart();
    cartItem.product_code = item.product_code;
    cartItem.product_name = item.product_name;

    let cartItemExist = this.CartService.itemInCart(cartItem);

    console.log(cartItemExist);

    if (!cartItemExist) {
      cartItem.quantity = 1;
      this.CartService.addToCart(cartItem); //add items in cart
      this.items = [...this.CartService.getItems()];
    }

    console.log(this.items);

    let cartCount = this.CartService.getCartCount();
    this.CartService.setCartCount(cartCount);
  }
}
