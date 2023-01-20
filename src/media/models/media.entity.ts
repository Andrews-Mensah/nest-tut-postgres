import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('media')
export class MediaEntity{
@PrimaryGeneratedColumn('uuid')
id: string;

@Column({default:''})
originalname: string;

@Column({default: ''})
path: string;
    
@Column()
mimetype: string;

@Column()
filename: string;

@Column({type: 'timestamp', default: ()=> 'CURRENT_TIMESTAMP'})
createdAt: Date;

@Column({type: 'timestamp', default: ()=> 'CURRENT_TIMESTAMP'})
updatedAt: Date;
}