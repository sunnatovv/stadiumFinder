import { ApiProperty } from '@nestjs/swagger';

import { Column, DataType, Model } from 'sequelize-typescript';

interface IDistrictCreationAttr {
  name: string;
  regionId: number;
}

export class District extends Model<District, IDistrictCreationAttr> {
  @ApiProperty({
    example: 1,
    description: 'district Id unikal raqami',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'Hullas',
    description: 'District nomi',
  })
  @Column({
    type: DataType.STRING,
  })
  name: string;
}
