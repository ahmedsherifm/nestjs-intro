import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  insertProduct(product: Product): string {
    const prodId = Math.random().toString();
    product.id = prodId;
    this.products.push(product);
    return prodId;
  }

  getProducts(): Product[] {
    return [...this.products];
  }

  getSignleProduct(productId: string): Product {
    return {...this.findProduct(productId)};
  }

  updateProduct(productId: string, prod: Product): Product {
    const product = this.findProduct(productId);

    product.title = prod.title ? prod.title : product.title;
    product.price = prod.price ? prod.price : product.price;
    product.description = prod.description ? prod.description : product.description;

    return {...product};
  }

  deleteProduct(productId: string) {
    const productIndex = this.products.findIndex(p => p.id == productId);
    this.products.splice(productIndex,1);
  }

  findProduct(productId: string): Product {
    const product = this.products.find(p => p.id == productId);
    
    if(!product) {
      throw new NotFoundException(`Could not find product with id: ${productId}`);
    }

    return product;
  }
}
