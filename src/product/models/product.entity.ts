import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('products')
export class ProductEntity{
@PrimaryGeneratedColumn('uuid')
id: string;

@Column({default:''})
name: string;

@Column({default: ''})
description: string;
    
@Column()
quantity: number;

@Column()
price: number;

@Column({type: 'timestamp', default: ()=> 'CURRENT_TIMESTAMP'})
createdAt: Date;

@Column({type: 'timestamp', default: ()=> 'CURRENT_TIMESTAMP'})
updatedAt: Date;
}