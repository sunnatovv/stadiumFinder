import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';

interface IUserCreationAttr {
  full_name: string;
  phone: string;
  email: string;
  hashed_password: string;
  tg_link: string;
  photo: string;
  is_owner: boolean;
  is_active: boolean;
}
@Table({ tableName: 'users' })
export class User extends Model<User, IUserCreationAttr> {
  @ApiProperty({
    example: 1,
    description: 'Foydalanuvchi Id unikal raqami',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: "Sobir",
    description: 'Foydalanuvchi ismi',
  })
  @Column({
    type: DataType.STRING,
  })
  full_name: string;

  @Column({
    type: DataType.STRING,
  })
  phone: string;

  @Column({
    type: DataType.STRING,
    // unique: true,
  })
  email: string;
  @Column({
    type: DataType.STRING,
  })
  hashed_password: string;
  @Column({
    type: DataType.STRING,
  })
  tg_link: string;
  @Column({
    type: DataType.STRING,
  })
  photo: string;
  @Column({
    type: DataType.BOOLEAN,
  })
  is_owner: boolean;
  defaultValue: false;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;
  @Column({
    type: DataType.STRING,
  })
  hashed_refresh_token: string;
  @Column({
    type: DataType.STRING,
  })
  activation_link: string;
}
