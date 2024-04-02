import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

// Data transfer object (DTO) for creating a new Media entry
export class CreateMediaDto {
  @ApiProperty({
    description: 'ID of the stadium associated with the media',
    required: true,
  })
  @IsNumber({}, { message: 'Stadium ID must be a number' })
  @IsNotEmpty({ message: 'Stadium ID is required' })
  stadiumId: number; // ID of the stadium associated with the media

  @ApiProperty({
    description: 'URL or file path of the media/photo',
    required: true,
  })
  @IsString({ message: 'Photo must be a string' })
  @IsNotEmpty({ message: 'Photo URL/path is required' })
  photo: string; // URL or file path of the media/photo

  @ApiProperty({
    description: 'Description or caption for the media',
    required: true,
  })
  @IsString({ message: 'Description must be a string' })
  @IsNotEmpty({ message: 'Description is required' })
  description: string; // Description or caption for the media
}
