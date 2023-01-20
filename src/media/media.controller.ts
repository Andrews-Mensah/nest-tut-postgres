import { Controller, UploadedFile } from '@nestjs/common';
import { UseInterceptors } from '@nestjs/common/decorators/core/use-interceptors.decorator';
import { Post } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { MediaService } from './media.service';

@Controller('media')
export class MediaController {


    constructor(
        private readonly mediaService: MediaService
    ){}

    @Post('upload')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, callback)=>{

                const uniqueSuffix = 

                Date.now() + '-' + Math.round(Math.random() * 1e9);

                const ext = extname(file.originalname)

                const filename = `${file.originalname}-${uniqueSuffix}${ext}`

                callback(null,filename)
            }
        })
    }))
    async handleFileUpload(@UploadedFile() file: Express.Multer.File){
        console.log("FILEEEEEEEEEEEEEE",file);

        return await this.mediaService.uploadProductPhoto(file)
    }
}
