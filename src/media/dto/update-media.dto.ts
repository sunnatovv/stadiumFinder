import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsOptional } from 'class-validator';

// Data transfer object (DTO) for updating a Media entry
export class UpdateMediaDto {
  @ApiProperty({
    description: 'ID of the stadium associated with the media',
    required: false,
  })
  @IsNumber({}, { message: 'Stadium ID must be a number' })
  @IsOptional()
  stadiumId?: number; // Optional: ID of the stadium associated with the media

  @ApiProperty({
    description: 'URL or file path of the media/photo',
    required: false,
  })
  @IsString({ message: 'Photo must be a string' })
  @IsOptional()
  photo?: string; // Optional: URL or file path of the media/photo

  @ApiProperty({
    description: 'Description or caption for the media',
    required: false,
  })
  @IsString({ message: 'Description must be a string' })
  @IsOptional()
  description?: string; // Optional: Description or caption for the media
}
