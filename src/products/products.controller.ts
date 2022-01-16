import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
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

  @Get(':id')
  getProduct(@Param('id') prodId: string): Product | void {
    return this.productsService.getSingleProduct(prodId);
  }
  @Patch(':id')
  updateProduct(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ): void {
    this.productsService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
  }

  @Delete(':id')
  removeProduct(@Param('id') prodId: string): void {
    this.productsService.deleteProduct(prodId);
  }
}
