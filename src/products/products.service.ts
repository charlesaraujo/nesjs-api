import { Injectable } from '@nestjs/common';
import { Product } from './products.model';

@Injectable()
export class ProductsService {
  products: Product[] = [];

  inserProduct(title: string, desc: string, price: number): string {
    const prodId = new Date().toString();
    const newProduct = new Product(prodId, title, desc, price);
    console.log(newProduct);
    this.products.push(newProduct);
    return prodId;
  }

  getProducts(): Product[] {
    return [...this.products];
  }
}
