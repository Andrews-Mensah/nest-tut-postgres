import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import config from './config/keys';
import { JwtModule } from '@nestjs/jwt/dist';
import { MediaModule } from './media/media.module';
import { MulterModule } from '@nestjs/platform-express/multer';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: config.DBHOST,
      port: parseInt(config.DBPORT),
      username: config.DBUSER,
      password: config.DBPASSWORD,
      database: config.DBNAME,
      entities: [],
      autoLoadEntities: true,
      synchronize: true, // in production this should be false
    }),
    ProductModule,
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      privateKey:'yyuuyyyyhhhdhhhdd',
      // signOptions:{
      //   expiresIn: process.env.EXPIRES
      // }
    }),
    MediaModule,
    MulterModule.register({
      dest: './uploads'
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})


export class AppModule {}
