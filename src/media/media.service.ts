import { Injectable } from '@nestjs/common';
import { UseInterceptors } from '@nestjs/common/decorators/core/use-interceptors.decorator';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MediaEntity } from './models/media.entity';
import { MediaInterface } from './models/media.interface';

@Injectable()
export class MediaService {

    constructor(
        @InjectRepository(MediaEntity)
        private readonly mediaRepository: Repository<MediaEntity>
    ){}


    async uploadProductPhoto(Media: MediaInterface):Promise<MediaInterface>{
        
        const newProductImage = this.mediaRepository.save(Media)
        return newProductImage

    }
}
