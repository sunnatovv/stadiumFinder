import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface IComfortCreationAttr {
  name: string;
}

@Table({ tableName: 'comfort' })
export class Comfort extends Model<Comfort, IComfortCreationAttr> {
  @ApiProperty({
    example: 1,
    description: 'Comfort Id unikal raqami',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'Hullas',
    description: 'Comfort nomi',
  })
  @Column({
    type: DataType.STRING,
  })
  name: string;
}
