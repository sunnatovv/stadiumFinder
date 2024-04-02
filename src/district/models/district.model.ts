import { ApiProperty } from '@nestjs/swagger';

import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface IDistrictCreationAttr {
  name: string;
  regionId: number;
}
@Table({tableName:"district"})
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
