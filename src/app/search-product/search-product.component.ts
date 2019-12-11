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
  products: Product[] = [];
  error_message: string;

  constructor(private productService: ProductService) { }

  ngOnInit() {
  }

  reset(){
    this.productDescriptionEnglish = '';
    this.productId = null;
    this.error_message = '';
    this.products = [];
    console.log("Reset Button has been pressed");
  }

  search(productId: any, productDescriptionEnglish: any) {
    this.products = [];
    if ((productId == null || productId.length === 0) && ( productDescriptionEnglish == null || productDescriptionEnglish.length === 0)) {
      this.productService.getProducts().subscribe((data: any) => {
        this.products = <Product[]>data;
        this.error_message = '';
      }, (err: any) => {
        this.error_message = '';
      });
    }
    else {
      if ((productId != null && productId.length != 0) && (productDescriptionEnglish == null || productDescriptionEnglish.length === 0)) {
        this.productService.getProduct(productId).subscribe((data: any) => {
          if (data === null) {
            this.error_message =  'The id: ' + productId + ' was not found';
          } else {
            this.error_message = '';
            this.products.push(data);
          }
        }, (err: any) => {
          this.error_message =  'The id: ' + productId + ' was not found';
          console.log(err.error.error);
          //this.products = [];
        });

      } else {
        if ((productId != null && productId.length != 0) && (productDescriptionEnglish != null && productDescriptionEnglish.length != 0)) {
          this.productService.getProductIdAndProductDescription(productId, productDescriptionEnglish).subscribe((data: any) => {
            this.products.push(data);
            this.error_message = '';
          }, (err: any) => {
            this.error_message = " An error was detected.";
            console.log(err);
          });
        }
        else {
          this.productService.getProductDescription(productDescriptionEnglish).subscribe((data: any) => {
            this.products = <Product[]>data;
            this.error_message = '';
          }, (err: any) => {
            this.error_message = "An error was detected";
            console.log(err);
          });
        }
      } //else
    } //else
  } //search
}
