import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './models/user.entity';
import { JwtModule } from '@nestjs/jwt/dist';

@Module({
  imports:[
    TypeOrmModule.forFeature([UserEntity]), 
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      // signOptions:{
      //   expiresIn: process.env.EXPIRES
      // }
    })
  ],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
