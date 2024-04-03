import { Table, Column, DataType, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Stadiums } from '../../stadiums/model/stadium.model';

// Interface for defining the attributes required to create a new stadium time entry
interface StadiumTimesCreationAttr {
  stadiumId: number; // ID of the stadium
  startTime: number; // Start time of the stadium slot
  endTime: number; // End time of the stadium slot
  price: number; // Price for the stadium slot
}

// Define the Sequelize model for the stadium times
@Table({ tableName: 'stadium_times' }) // Define table name
export class StadiumTimes extends Model<
  StadiumTimes,
  StadiumTimesCreationAttr
> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number; // Unique ID for the stadium time entry

  @ForeignKey(() => Stadiums)
  @Column({ type: DataType.INTEGER, allowNull: false })
  stadiumId: number; // ID of the stadium

  @Column({ type: DataType.INTEGER, allowNull: false })
  startTime: number; // Start time of the stadium slot

  @Column({ type: DataType.INTEGER, allowNull: false })
  endTime: number; // End time of the stadium slot

  @Column({ type: DataType.FLOAT, allowNull: false })
  price: number; // Price for the stadium slot

  @BelongsTo(() => Stadiums)
  stadiums:Stadiums
}
