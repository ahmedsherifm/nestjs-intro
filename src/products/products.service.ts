import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product } from './product.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  constructor(@InjectModel('Product') private productModel: Model<Product>) { }

  async insertProduct(product: Product): Promise<string> {
    const newProduct = new this.productModel({ ...product })
    const result = await newProduct.save();
    return result.id;
  }

  async getProducts(): Promise<any[]> {
    const results = await this.productModel.find().exec() as Product[];
    return results.map(this.mapProduct);
  }

  async getSignleProduct(productId: string): Promise<any> {
    const result = await this.findProduct(productId);
    return this.mapProduct(result);
  }

  async updateProduct(productId: string, prod: Product): Promise<any> {
    const updatedProduct = await this.findProduct(productId);

    updatedProduct.title = prod.title ? prod.title : updatedProduct.title;
    updatedProduct.price = prod.price ? prod.price : updatedProduct.price;
    updatedProduct.description = prod.description ? prod.description : updatedProduct.description;

    const result = await updatedProduct.save();
    return this.mapProduct(result);
  }

  async deleteProduct(productId: string): Promise<any> {
    const result = await this.productModel.deleteOne({ _id: productId });
    if (result.n == 0) {
      throw new NotFoundException(`Could not find product with id: ${productId}`);
    }

    return true;
  }

  private async findProduct(productId: string) {
    try {
      const product = await this.productModel.findById(productId);

      if (!product) {
        throw new NotFoundException(`Could not find product with id: ${productId}`);
      }

      return product;
    } catch (error) {
      throw new NotFoundException(`Could not find product with id: ${productId}`);
    }
  }

  private mapProduct(prod: Product) {
    return {
      id: prod.id,
      title: prod.title,
      description: prod.description,
      price: prod.price
    };
  }
}
