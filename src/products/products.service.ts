import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './products.model';

@Injectable()
export class ProductsService {
  products: Product[] = [];

  inserProduct(title: string, desc: string, price: number): string {
    const prodId = Math.random().toString();
    const newProduct = new Product(prodId, title, desc, price);
    this.products.push(newProduct);
    return prodId;
  }

  getProducts(): Product[] {
    return [...this.products];
  }

  getSingleProduct(productId: string): Product {
    const [product] = this.findProduct(productId);
    return { ...product };
  }
  updateProduct(
    productId: string,
    title: string,
    desc: string,
    price: number,
  ): void {
    const [product, index] = this.findProduct(productId);
    const updatedProduct = { ...product };
    if (title) {
      updatedProduct.title = title;
    }
    if (desc) {
      updatedProduct.description = desc;
    }
    if (price) {
      updatedProduct.price = price;
    }
    this.products[index] = updatedProduct;
  }

  deleteProduct(productId: string): void {
    const [_, index] = this.findProduct(productId);
    this.products.splice(index, 1);
  }

  private findProduct(id: string): [Product, number] {
    const productIndex = this.products.findIndex((prod) => prod.id === id);
    const product = this.products[productIndex];
    if (!product) {
      throw new NotFoundException('Could not find product.');
    }
    return [product, productIndex];
  }
}
