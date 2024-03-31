import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model } from 'sequelize-typescript';

interface IAdminCreationAttr {
  login: string;
  telegram_link: string;
  admin_photo: string;
  password: string;
}
export class Admin extends Model<Admin, IAdminCreationAttr> {
  @ApiProperty({
    example: 1,
    description: 'category Id unikal raqami',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'Hullas',
    description: 'Category nomi',
  })
  @Column({
    type: DataType.STRING,
  })
  login: string;

  @ApiProperty({
    example: 'https://tg.org',
    description: 'Category nomi',
  })
  @Column({
    type: DataType.STRING,
  })
  telegram_link: string;
  @ApiProperty({
    example: '/img',
    description: 'Category nomi',
  })
  @Column({
    type: DataType.STRING,
  })
  admin_photo: string;
  @ApiProperty({
    example: 'parol123a',
    description: 'Category nomi',
  })
  @Column({
    type: DataType.STRING,
  })
  password: string;
}
