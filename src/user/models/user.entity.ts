import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class UserEntity{
@PrimaryGeneratedColumn('uuid')
id: string;

@Column({default:''})
name: string;

@Column({default: '', unique: true})
email: string;
    
@Column()
password: string;

@Column({type: 'timestamp', default: ()=> 'CURRENT_TIMESTAMP'})
createdAt: Date;

@Column({type: 'timestamp', default: ()=> 'CURRENT_TIMESTAMP'})
updatedAt: Date;
}