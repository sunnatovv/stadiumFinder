import { Module } from '@nestjs/common';
import { CommmentController } from './comments.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Comments } from './models/comment.model';
import { CommentService } from './comments.service';

@Module({
  imports: [SequelizeModule.forFeature([Comments])],
  controllers: [CommmentController],
  providers: [CommentService],
})
export class CommentsModule {}
