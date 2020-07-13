import { Injectable } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  insertProduct(product: Product): string {
    const prodId = new Date().toString();
    product.id = prodId;
    this.products.push(product);
    return prodId;
  }

  getProducts(): Product[] {
    return [...this.products];
  }
}
