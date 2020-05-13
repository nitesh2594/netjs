import { Controller,Post,Body, Get, Param, Delete} from "@nestjs/common";
import { ProductsService } from "./products.service";

@Controller('products')
export class ProductsController{
    constructor(private readonly prodcutsService:ProductsService){}
    @Post()
    async addProduct(@Body('title') Prodtitle:string, @Body('description') proddes:string,@Body('price') prodPrice:number){
       const generatedId= await this.prodcutsService.insertProduct(Prodtitle,proddes,prodPrice);
       return {Id:generatedId};
    }
    @Get()
    async getAllProducts(){
        const products=await this.prodcutsService.getProducts();
        return products;
    }
    @Get(':id')
   async getSingleProduct(@Param('id') prodID:string){
        const product= await this.prodcutsService.getProductBydID(prodID);
        return product;
    }
    @Delete(':id')
    async removeProduct(@Param('id') prodId:string){
        await this.prodcutsService.deleteProduct(prodId);
        return null;
    } 
}
