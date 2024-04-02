import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Stadiums } from '../../stadiums/model/stadium.model';

// Interface for defining attributes required for creating a new Media entry
interface MediaCreationAttr {
  stadiumId: number; // ID of the stadium associated with the media
  photo: string; // URL or file path of the media/photo
  description: string; // Description or caption for the media
}

@Table({ tableName: 'media' })
export class Media extends Model<Media, MediaCreationAttr> {
  @ApiProperty({
    description: 'Unique identifier for the media entry',
    required: false,
  })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number; // Unique identifier for the media entry, auto-incremented

  @ApiProperty({
    description: 'ID of the stadium associated with the media',
    required: true,
  })
  @ForeignKey(() => Stadiums)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  stadiumId: number; // ID of the stadium associated with the media

  @ApiProperty({
    description: 'URL or file path of the media/photo',
    required: true,
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  photo: string; // URL or file path of the media/photo

  @ApiProperty({
    description: 'Description or caption for the media',
    required: true,
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string; // Description or caption for the media

  @BelongsTo(() => Stadiums)
  stadiums: Stadiums;
}
