import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { MediaEntity } from './models/media.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports:[TypeOrmModule.forFeature([MediaEntity]), 
  MulterModule.register({
    dest: './uploads'
  })],
  providers: [MediaService],
  controllers: [MediaController]
})
export class MediaModule {}
