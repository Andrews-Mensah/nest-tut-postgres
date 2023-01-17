import { Body, Controller, Delete, Get, Header, Param, Post, Put } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ProductInterface } from './models/product.interface';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {

    constructor(
        private readonly productService: ProductService
    ){}

    @Post()
    @Header('Content-Type', 'application/json')
   async create(@Body() post: ProductInterface){
      return await this.productService.createProduct(post);
    }

    @Get()
   async  findAll(){
     return await  this.productService.findAll()
    }

    @Get(':id')
  async findOne(@Param('id') id): Promise<ProductInterface> {
    return await this.productService.findOne(id); 
  }

  @Delete(':id')
  deleteOne(@Param('id') id): Promise<DeleteResult>{
    return this.productService.deleteProduct(id)
  }

  @Put(':id')
  updateOne(@Param('id') id, @Body() updateItemDto: ProductInterface): Promise<UpdateResult> {
    return this.productService.update(id, updateItemDto);
  }

}
