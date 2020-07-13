import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
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

  @Get(':id')
  getProduct(@Param('id') prodId: string): Product {
    return this.productsService.getSignleProduct(prodId);
  }

  @Patch(':id')
  updateProduct(@Param('id') prodId: string, @Body() prod: Product): Product {
    return this.productsService.updateProduct(prodId, prod);
  }

  @Delete(':id')
  removeProduct(@Param('id') prodId: string): any {
    return this.productsService.deleteProduct(prodId);
  }
}
