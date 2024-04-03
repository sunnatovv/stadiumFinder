import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Comments } from './models/comment.model';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {
  constructor(@InjectModel(Comments) private commentRepo: typeof Comments) {} // Assuming you have a repository for Comment entity

  /**
   * Create a new comment.
   * @param createCommentDto Data to create a new comment.
   * @returns The newly created comment.
   */
  async create(createCommentDto: CreateCommentDto) {
    return await this.commentRepo.create(createCommentDto);
  }

  /**
   * Retrieve all comments.
   * @returns A list of all comments.
   */
  async findAll() {
    return await this.commentRepo.findAll({ include: { all: true } });
  }

  /**
   * Retrieve a comment by ID.
   * @param id The ID of the comment to retrieve.
   * @returns The comment with the specified ID.
   * @throws NotFoundException if the comment is not found.
   */
  async findOne(id: number) {
    return await this.commentRepo.findByPk(id);
  }

  /**
   * Update a comment by ID.
   * @param id The ID of the comment to update.
   * @param updateCommentDto Data to update the comment.
   * @returns The updated comment.
   * @throws NotFoundException if the comment is not found.
   */
  async update(id: number, updateCommentDto: UpdateCommentDto) {
    const com = await this.commentRepo.update(updateCommentDto, {
      where: { id },
      returning: true,
    });
    return com[1][0];
  }

  /**
   * Remove a comment by ID.
   * @param id The ID of the comment to remove.
   * @throws NotFoundException if the comment is not found.
   */
  async remove(id: number) {
    const result = await this.commentRepo.destroy({ where: { id } });
    if (result == 0) {
      return 'Not found';
    }
    return 'removed';
  }
}
