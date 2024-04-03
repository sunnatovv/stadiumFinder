import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from '../../users/models/user.model';

interface UserCartCreationAttr {
  userId: string;
  name: string;
  number: string;
  year: number;
  month: number;
  isActive: boolean;
  isMain: boolean;
}

@Table({ tableName: 'user_carts' }) // Define table name
export class UserCart extends Model<UserCart, UserCartCreationAttr> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.STRING, allowNull: false })
  userId: string; // ID of the user

  @Column({ type: DataType.STRING, allowNull: false })
  name: string; // Name on the card

  @Column({ type: DataType.STRING, allowNull: false })
  number: string; // Card number

  @Column({ type: DataType.INTEGER, allowNull: false })
  year: number; // Expiration year of the card

  @Column({ type: DataType.INTEGER, allowNull: false })
  month: number; // Expiration month of the card

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  isActive: boolean; // Indicates whether the card is active

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  isMain: boolean; // Indicates whether the card is the main card for the user

  @BelongsTo(() => User)
  users: User;
}
