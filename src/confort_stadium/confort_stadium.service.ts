import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateConfortStadiumDto } from './dto/create-confort_stadium.dto';
import { UpdateConfortStadiumDto } from './dto/update-confort_stadium.dto';
import { ComfortStadium } from './model/confort_stadium.model';

@Injectable()
export class ConfortStadiumService {
  constructor(
    @InjectModel(ComfortStadium) // Injecting the Sequelize model into the service
    private readonly confortStadiumModel: typeof ComfortStadium,
  ) {}

  async create(createConfortStadiumDto: CreateConfortStadiumDto) {
    return await this.confortStadiumModel.create(createConfortStadiumDto); // Creating a new confort-stadium relation
  }

  async findAll() {
    return await this.confortStadiumModel.findAll(); // Finding all confort-stadium relations
  }

  async findOne(id: number) {
    return await this.confortStadiumModel.findByPk(id); // Finding a confort-stadium relation by primary key
  }

  async update(id: number, updateConfortStadiumDto: UpdateConfortStadiumDto) {
    const com = await this.confortStadiumModel.update(updateConfortStadiumDto, {
      where: { id },
      returning: true, // Returning the updated record
    });
    return com[1][0];
  }

  async remove(id: number) {
    const rowsAffected = await this.confortStadiumModel.destroy({
      where: { id },
    }); // Deleting a confort-stadium relation by primary key
    if (rowsAffected === 0) return 'Not found';
    return 'successfully removed';
  }
}
