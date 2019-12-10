import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../model/product';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css']
})
export class SearchProductComponent implements OnInit {
  productId: number;
  productDescriptionEnglish: string;
  products: Product[];
  error_message: string;

  constructor(private productService: ProductService) { }

  ngOnInit() {
  }

  reset(){
    this.productDescriptionEnglish = '';
    this.productId = null;
    this.products = [];
    this.error_message = '';
    console.log("Button pressed");
  }

  search(productId: any, productDescriptionEnglish: any) {

    if ((productId == null || productId.length === 0) && ( productDescriptionEnglish == null || productDescriptionEnglish.length === 0)) {
      this.productService.getProducts().subscribe((data: any) => {
        this.products = <Product[]>data;
        this.error_message = '';
      }, (err: any) => {
        this.error_message = err.error.error;
      });
    }
    else {
      if ((productId != null && productId.length != 0) && (productDescriptionEnglish == null || productDescriptionEnglish.length === 0)) {
        this.productService.getProduct(productId).subscribe((data: any) => {
          this.products = <Product[]>data;
          this.error_message = '';
        }, (err: any) => {
          this.error_message = err.error.error;
          this.products = [];
        });

      } else {
        if ((productId != null && productId.length != 0) && (productDescriptionEnglish != null && productDescriptionEnglish.length != 0)) {
          this.productService.getProductIdAndProductDescription(productId, productDescriptionEnglish).subscribe((data: any) => {
            this.products = <Product[]>data;
            this.error_message = '';
          }, (err: any) => {
            this.error_message = err.error.error;
          });
        }
        else {
          this.productService.getProductDescription(productDescriptionEnglish).subscribe((data: any) => {
            this.products = <Product[]>data;
            this.error_message = '';
          }, (err: any) => {
            this.error_message = err.error.error;
          });
        }
      } //else
    } //else
  } //search
}
