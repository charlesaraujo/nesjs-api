import { Controller, Post, Body, Get } from '@nestjs/common';
import { Product } from './products.model';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Post()
  addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ): any {
    return {
      id: this.productsService.inserProduct(prodTitle, prodDesc, prodPrice),
    };
  }

  @Get()
  getAllProducts(): Product[] {
    return this.productsService.getProducts();
  }
}
