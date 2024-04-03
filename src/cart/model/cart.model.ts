import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { UserWallet } from '../../user_wallet/model/user_wallet.model';
import { User } from '../../users/models/user.model';

// Interface representing the attributes required to create a Cart
interface CartCreationAttr {
  userId: number; // ID of the user associated with the cart
  userWalletId: number; // ID of the user wallet associated with the cart
  date: Date; // Date of the cart
  createdAt: Date; // Date and time when the cart was created
  timeForClear: Date; // Date and time when the cart will be cleared
  statusId: number; // ID representing the status of the cart
}

@Table({ tableName: 'cart' })
export class Cart extends Model<Cart, CartCreationAttr> {
  @ApiProperty({ description: 'The ID of the cart' })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  // Rest of the columns with Swagger annotations and comments
  @ApiProperty({ description: 'The ID of the user associated with the cart' })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @ApiProperty({
    description: 'The ID of the user wallet associated with the cart',
  })
  @ForeignKey(() => UserWallet)
  @Column({ type: DataType.INTEGER })
  userWalletId: number;

  @ApiProperty({ description: 'The date of the cart' })
  @Column({ type: DataType.DATE })
  date: Date;

  @ApiProperty({ description: 'The date and time when the cart was created' })
  @Column({ type: DataType.DATE })
  createdAt: Date;

  @ApiProperty({
    description: 'The date and time when the cart will be cleared',
  })
  @Column({ type: DataType.DATE })
  timeForClear: Date;

  @ApiProperty({ description: 'The ID representing the status of the cart' })
  @Column({ type: DataType.INTEGER })
  statusId: number;

  @BelongsTo(() => User)
  users: User;

  @BelongsTo(() => UserWallet)
  userWallet: UserWallet;
}
