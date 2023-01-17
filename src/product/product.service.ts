import { Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { DeleteResult, ObjectID, Repository, UpdateResult } from 'typeorm';
import { ProductEntity } from './models/product.entity';
import { ProductInterface } from './models/product.interface';


@Injectable()
export class ProductService {
    
    
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>
    ){}

    async createProduct(Product: ProductInterface):Promise<ProductInterface>{
        
        const newProduct = this.productRepository.save(Product)
        return newProduct

    }

    async findAll(){
        return this.productRepository.find()
    }

    async findOne(id:string):Promise<ProductInterface>{
        return this.productRepository.findOne({where:{id:id}})
    }

    async deleteProduct(id:string):Promise<DeleteResult>{
        const product = this.productRepository.findOne({where:{id:id}})

        return await this.productRepository.delete((await product).id)

       
    }

    async update(id: string, Product:ProductInterface): Promise<UpdateResult>{
        // const product = await this.productRepository.findOneBy({id})

        const updatedProduct = await this.productRepository.update(id, Product)

        return updatedProduct;
    }
}
