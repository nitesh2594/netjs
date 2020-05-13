import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./product.model";
import { InjectModel } from "@nestjs/mongoose";
import {Model} from 'mongoose';
@Injectable()
export class ProductsService{
    products:Product[]=[];
    constructor(@InjectModel('Product') private readonly productModel:Model<Product>){}

    async insertProduct(title:string,desc:string,price:number){
        
        const newProduct= new this.productModel({title,description:desc,price});
        const result=await newProduct.save();
        return result.id as string;
       
    }
    async getProducts(){
        const products=await this.productModel.find().exec();
        return products as Product[];
    }
    async getProductBydID(productID:string){
        let product;
        try{
        product=this.productModel.findByID(productID);
        }  catch(error){
            throw new NotFoundException('could not find product');
        } 
        if(!product){
            throw new NotFoundException('could not find product');
        }
        return product;

    }
    async deleteProduct(prodId:string){
        const result=await this.productModel.deleteOne({_id:prodId}).exec();
    if(result.n===0){
        throw new NotFoundException('could not find product');
    }
    }
}
