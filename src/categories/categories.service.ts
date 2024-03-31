import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './models/category.model';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category) private categoryDto: typeof Category) {}
  create(createCategoryDto: CreateCategoryDto) {
    return this.categoryDto.create(createCategoryDto);
  }

  findAll() {
    return this.categoryDto.findAll();
  }

  findOne(id: number) {
    return this.categoryDto.findByPk(id);
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const uCategory = await this.categoryDto.update(updateCategoryDto, {
      where: { id },
      returning: true,
    });

    return uCategory[1][0];
  }

  remove(id: number) {
    return this.categoryDto.destroy({ where: { id } });
  }
}
