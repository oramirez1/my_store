import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  chart = [];

  constructor(private _productService: ProductService) { }

  ngOnInit() {
    this._productService.getAvailableProducts().subscribe(res => {
      
      let availableProducts = res["availableProducts"];
      let unusedProducts = res["unusedProducts"];

      this.chart = new Chart('canvas', {
        type: 'pie',
        data: {
          datasets: [{
            data: [ availableProducts, unusedProducts ],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
            ],
            borderColor : [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
            ],
          }],
          labels: [
            'Available',
            'Unused'
          ]
        }
      });

    });

  }

}
