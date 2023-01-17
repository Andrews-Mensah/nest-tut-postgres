import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import config from './config/keys';


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
    ProductModule
  ],
  controllers: [AppController],
  providers: [AppService],
})


export class AppModule {}
