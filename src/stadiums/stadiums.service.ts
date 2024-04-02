import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateStadiumDto } from './dto/create-stadium.dto';
import { UpdateStadiumDto } from './dto/update-stadium.dto';
import { Stadiums } from './model/stadium.model';

@Injectable()
export class StadiumsService {
  constructor(
    @InjectModel(Stadiums)
    private readonly stadiumModel: typeof Stadiums,
  ) {}

  async create(createStadiumDto: CreateStadiumDto) {
    return await this.stadiumModel.create(createStadiumDto);
  }

  async findAll() {
    return await this.stadiumModel.findAll();
  }

  async findOne(id: number) {
    return await this.stadiumModel.findByPk(id);
  }

  async update(id: number, updateStadiumDto: UpdateStadiumDto) {
    const sta = await this.stadiumModel.update(updateStadiumDto, {
      where: { id },
      returning: true,
    });

    return sta[1][0];
  }

  async remove(id: number) {
    const rowsAffected = await this.stadiumModel.destroy({ where: { id } });
    if (rowsAffected == 0) return 'Not found';
    return "successfully removed";
  }
}
