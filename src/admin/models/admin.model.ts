import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface AdminCreationAttr {
  login: string;
  tgLink: string;
  adminPhoto: string;
  hashedPassword: string;
}

@Table({ tableName: 'admin' })
export class Admin extends Model<Admin, AdminCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
  })
  login: string;

  @Column({
    type: DataType.STRING,
  })
  tgLink: string;

  @Column({
    type: DataType.STRING,
  })
  adminPhoto: string;

  @Column({
    type: DataType.STRING,
  })
  hashedPassword: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isActive: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isCreator: boolean;

  @Column({
    type: DataType.STRING,
  })
  hashedRefreshToken: string;

  activationLink: string;
}
