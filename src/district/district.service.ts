import { Injectable } from '@nestjs/common';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { InjectModel } from '@nestjs/sequelize';
import { District } from './models/district.model';

@Injectable()
export class DistrictService {
  constructor(@InjectModel(District) private districtDto: typeof District) {}
  create(createDistrictDto: CreateDistrictDto) {
    return this.districtDto.create(createDistrictDto);
  }

  findAll() {
    return this.districtDto.findAll();
  }

  findOne(id: number) {
    return this.districtDto.findByPk(id);
  }

  async update(id: number, updateDistrictDto: UpdateDistrictDto) {
    const uDistrict = await this.districtDto.update(updateDistrictDto, {
      where: { id },
      returning: true,
    });
  }

  remove(id: number) {
    return this.districtDto.destroy({ where: { id } });
  }
}
