import { Component, OnInit, Input } from '@angular/core';
import { CartService } from "../cart.service";
import { ActivatedRoute } from '@angular/router'
import { ProductService } from '../shared/product.service';
import { Product } from '../shared/product.model';
interface Item {
  icon: string;
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  @Input() item: Item;
  product_code: any;
  product: Product;
  readonly imageUrl: string = "http://localhost:3000/images";
  formatter = new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB',
  minimumFractionDigits: 0 });

  constructor(private itemServ: CartService
    , private route: ActivatedRoute
    , private ProductService: ProductService
    , private ActivatedRoute: ActivatedRoute ) {

      this.product = {
        _id: "",
        product_code: "",
        product_name: "",
        image: this.imageUrl + "noimg.png",
        price: 0
      };
  }

  ngOnInit() {
    this.product_code = this.ActivatedRoute.snapshot.params['product_code'];

    this.getProduct(this.product_code);
  }

  getProduct(code: any) {
		this.ProductService.getProduct(code).subscribe(res => {
			this.product = res as Product;
		});
	}

  addCart() {
    let local_storage: any;
    let itemsInCart = [];

    if (localStorage.getItem('cart') == null)
    {
      itemsInCart.push(this.product);

      localStorage.setItem('cart', JSON.stringify(itemsInCart));
    }
    else
    {
      local_storage = JSON.parse(localStorage.getItem('cart') || '{}');
      
      itemsInCart = local_storage;
      itemsInCart.push(this.product);

      localStorage.setItem('cart', JSON.stringify(itemsInCart));
    }

  }
}
