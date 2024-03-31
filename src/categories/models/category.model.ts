import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface ICategoryCreationAttr {
  name: string;
  parentId: number;
}

@Table({ tableName: 'category' })
export class Category extends Model<Category, ICategoryCreationAttr> {
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
