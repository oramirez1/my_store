import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Product } from './model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl: string = environment.baseUrl;
  constructor(private _http: HttpClient) { }

  public getProducts() {
    console.log(this.baseUrl + '/products');
    return this._http.get(`${this.baseUrl+ '/products'}`);
  }

  public getProduct(id: any) {
    console.log(this.baseUrl + '/product/' + id);
    return this._http.get(`${this.baseUrl + '/product/' + id}`);
  }

  public getProductIdAndProductDescription(id: any, description: any) {
    console.log(this.baseUrl + '/product/' + id + '/productIdAndProductDescriptionEnglish/' + description);
    return this._http.get(`${this.baseUrl + '/product/' + id + '/productIdAndProductDescriptionEnglish/' + description}`);
  }

  public getProductDescription(description: any) {
    console.log(this.baseUrl + '/product/productDescriptionEnglish/' + description);
    return this._http.get(`${this.baseUrl + '/product/productDescriptionEnglish/' + description}`);
  }

  public getAvailableProducts() {
    console.log(this.baseUrl + '/availableProducts');
    return this._http.get(`${this.baseUrl + '/availableProducts'}`);
  }

  create(product: Product) {
    console.log(this.baseUrl + '/product/create');
    this._http.post<Product>(`${this.baseUrl}/product/create`, product).subscribe(data => {
      console.log(data);
    },
    error =>
    console.log('Could not create product.'));
  }

}
