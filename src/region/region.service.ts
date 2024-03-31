import { Injectable } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Region } from './models/region.model';

@Injectable()
export class RegionService {
  constructor(@InjectModel(Region) private regionDto: typeof Region) {}
  create(createRegionDto: CreateRegionDto) {
    return this.regionDto.create(createRegionDto);
  }

  findAll() {
    return this.regionDto.findAll();
  }

  findOne(id: number) {
    return this.regionDto.findByPk(id);
  }

  async update(id: number, updateRegionDto: UpdateRegionDto) {
    const region = await this.regionDto.update(updateRegionDto, {
      where: { id },
      returning: true,
    });

    return region[1][0];
  }

  remove(id: number) {
    return this.regionDto.destroy({ where: { id } });
  }
}
