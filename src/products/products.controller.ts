import { Controller, Post, Body, Get } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.model';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) { }

  @Post()
  addProduct(@Body() product: Product): any {
    const prodId = this.productsService.insertProduct(product);
    return { id: prodId };
  }

  @Get()
  getAllProducts(): Product[] {
    return this.productsService.getProducts();
  }
}
