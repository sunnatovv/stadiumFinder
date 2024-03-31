import { Injectable } from '@nestjs/common';
import { CreateComfortDto } from './dto/create-comfort.dto';
import { UpdateComfortDto } from './dto/update-comfort.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Comfort } from './models/comfort.model';

@Injectable()
export class ComfortService {
  constructor(@InjectModel(Comfort) private comfortDto: typeof Comfort) {}
  create(createComfortDto: CreateComfortDto) {
    return this.comfortDto.create(createComfortDto);
  }

  findAll() {
    return this.comfortDto.findAll();
  }

  findOne(id: number) {
    return this.comfortDto.findByPk(id);
  }

  async update(id: number, updateComfortDto: UpdateComfortDto) {
    const comfort = await this.comfortDto.update(updateComfortDto, {
      where: { id },
      returning: true,
    });
    return comfort[1][0];
  }

  remove(id: number) {
    return this.comfortDto.destroy({ where: { id } });
  }
}
