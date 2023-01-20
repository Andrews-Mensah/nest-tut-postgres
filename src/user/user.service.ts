import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './models/user.entity';
import { UserInterface } from './models/user.interface';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ){}

    async register(User: UserInterface): Promise<UserInterface>{

        const newUser = await this.userRepository.save(User)
        
        return newUser
    }

    async findOneByEmail(userEmail:string):Promise<UserInterface>{

        return this.userRepository.findOne({
            where: {email: userEmail},
        });

    }

    async findOneById(userId:string):Promise<UserInterface>{

        return this.userRepository.findOne({
            where: {id:userId},
        });

    }

}
