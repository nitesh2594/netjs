import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './Products/product.module';
import { MongooseModule} from '@nestjs/mongoose'
@Module({
  imports: [ProductModule,MongooseModule.forRoot(
    'mongodb+srv://nitesh:santabanta@cluster0-qg2en.mongodb.net/nestjs-demo?retryWrites=true&w=majority'
  )],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
