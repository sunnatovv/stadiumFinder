import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from './models/admin.model';

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin) private adminRepo: typeof Admin) {}
  create(createAdminDto: CreateAdminDto) {
    return this.adminRepo.create(createAdminDto);
  }

  findAll() {
    return this.adminRepo.findAll();
  }

  findOne(id: number) {
    return this.adminRepo.findByPk(id);
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const adnin = await this.adminRepo.update(updateAdminDto, {
      where: { id },
      returning: true,
    });
    return adnin[1][0];
  }

  remove(id: number) {
    return this.adminRepo.destroy({ where: { id } });
  }
}
