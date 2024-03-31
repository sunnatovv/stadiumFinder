import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model } from 'sequelize-typescript';

interface IRegionCreationAttr {
  name: string;
}

export class Region extends Model<Region, IRegionCreationAttr> {
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
  name: string;
}
