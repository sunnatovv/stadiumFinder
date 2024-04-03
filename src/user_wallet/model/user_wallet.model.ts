import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/models/user.model';

// Interface representing the attributes required to create a user wallet entry
interface IUserWalletCreationAttr {
  userId: number; // ID of the user
  wallet: number; // Amount in the wallet
}

@Table({ tableName: 'user_wallet' }) // Define table name
export class UserWallet extends Model<UserWallet, IUserWalletCreationAttr> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number

  @ForeignKey(() => User)
  @ApiProperty({ description: 'The ID of the user' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number; // ID of the user

  @ApiProperty({ description: 'The amount in the wallet' })
  @Column({ type: DataType.FLOAT, allowNull: false })
  wallet: number; // Amount in the wallet

  @BelongsTo(() => User)
  users: User;
}
