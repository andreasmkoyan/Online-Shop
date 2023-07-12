import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment, CommentSchema } from './entities/comment.entity';
import { Product, ProductSchema } from 'src/product/entities/product.entity';
import { User, UserSchema } from 'src/user/entities/user.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Comment.name, schema:CommentSchema },{ name: Product.name, schema:ProductSchema },{ name: User.name, schema:UserSchema }])],
  controllers: [CommentController],
  providers: [CommentService]
})
export class CommentModule {}
