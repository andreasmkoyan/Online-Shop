import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { CommentModule } from './comment/comment.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { UploadModule } from './modules/upload/upload.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017/project'), UserModule, ProductModule, CategoryModule, CommentModule, CartModule, OrderModule, AuthModule,
  MailerModule.forRootAsync({
    useFactory: () => ({
      transport: {
        // host: 'smtp.office365.com',
        // port: 587,
        service: 'gmail',
        tls: {
          ciphers: 'SSLv3',
        },
        secure: false, // true for 465, false for other ports
        auth: {
          user: "andreasmkoyanreact@gmail.com", // generated ethereal user
          pass: 'qgeveuwnockgldts', // generated ethereal password
        },
      },
      defaults: {
        from: '"nest-modules" <user@outlook.com>', // outgoing email ID
      },

    }),
  }),
    MailerModule, UploadModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
