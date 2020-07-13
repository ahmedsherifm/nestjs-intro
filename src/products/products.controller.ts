import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.model';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) { }

  @Post()
  async addProduct(@Body() product: Product): Promise<any> {
    const prodId = await this.productsService.insertProduct(product);
    return { id: prodId };
  }

  @Get()
  async getAllProducts(): Promise<Product[]> {
    return await this.productsService.getProducts();
  }

  @Get(':id')
  async getProduct(@Param('id') prodId: string): Promise<Product> {
    return await this.productsService.getSignleProduct(prodId);
  }

  @Patch(':id')
  async updateProduct(@Param('id') prodId: string, @Body() prod: Product): Promise<Product> {
    return await this.productsService.updateProduct(prodId, prod);
  }

  @Delete(':id')
  async removeProduct(@Param('id') prodId: string): Promise<any> {
    return await this.productsService.deleteProduct(prodId);
  }
}
