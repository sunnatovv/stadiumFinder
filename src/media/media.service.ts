import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { Media } from './model/media.model';

@Injectable()
export class MediaService {
  constructor(
    @InjectModel(Media) // Injecting the Sequelize model into the service
    private readonly mediaModel: typeof Media,
  ) {}

  async create(createMediaDto: CreateMediaDto) {
    return await this.mediaModel.create(createMediaDto); // Creating a new media entry
  }

  async findAll() {
    return await this.mediaModel.findAll(); // Finding all media entries
  }

  async findOne(id: number) {
    return await this.mediaModel.findByPk(id); // Finding a media entry by primary key
  }

  async update(id: number, updateMediaDto: UpdateMediaDto) {
    const med = await this.mediaModel.update(updateMediaDto, {
      where: { id },
      returning: true, // Returning the updated record
    });
    return med[1][0];
  }

  async remove(id: number) {
    const rowsAffected = await this.mediaModel.destroy({ where: { id } }); // Deleting a media entry by primary key
    if (rowsAffected === 0) return 'Not found';
    return 'successfully removed';
  }
}
