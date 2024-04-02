import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsInt, IsString, Min, Max, IsDate } from 'class-validator';

export class UpdateStadiumDto {
  // Category ID of the stadium (optional)
  @ApiProperty({
    description: 'Category ID of the stadium',
    required: false,
  })
  @IsInt()
  @IsOptional()
  categoryId?: number;

  // Owner ID of the stadium (optional)
  @ApiProperty({
    description: 'Owner ID of the stadium',
    required: false,
  })
  @IsInt()
  @IsOptional()
  ownerId?: number;

  // Contact information for the stadium (optional)
  @ApiProperty({
    description: 'Contact information for the stadium',
    required: false,
  })
  @IsString()
  @IsOptional()
  contactWith?: string;

  // Name of the stadium (optional)
  @ApiProperty({
    description: 'Name of the stadium',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  // Volume of the stadium (optional)
  @ApiProperty({
    description: 'Volume of the stadium',
    required: false,
  })
  @IsString()
  @IsOptional()
  volume?: string;

  // Address of the stadium (optional)
  @ApiProperty({
    description: 'Address of the stadium',
    required: false,
  })
  @IsString()
  @IsOptional()
  address?: string;

  // Region ID of the stadium (optional)
  @ApiProperty({
    description: 'Region ID of the stadium',
    required: false,
  })
  @IsInt()
  @IsOptional()
  regionId?: number;

  // District ID of the stadium (optional)
  @ApiProperty({
    description: 'District ID of the stadium',
    required: false,
  })
  @IsInt()
  @IsOptional()
  districtId?: number;

  // Location of the stadium (optional)
  @ApiProperty({
    description: 'Location of the stadium',
    required: false,
  })
  @IsString()
  @IsOptional()
  location?: string;

  // Date when the stadium was built (optional)
  @ApiProperty({
    description: 'Date when the stadium was built',
    required: false,
  })
  @IsDate()
  @IsOptional()
  buildAt?: Date;

  // Starting time of stadium operations (optional)
  @ApiProperty({
    description: 'Starting time of stadium operations',
    required: false,
  })
  @IsInt()
  @IsOptional()
  @Min(0)
  @Max(23)
  startTime?: number;

  // Ending time of stadium operations (optional)
  @ApiProperty({
    description: 'Ending time of stadium operations',
    required: false,
  })
  @IsInt()
  @IsOptional()
  @Min(0)
  @Max(23)
  endTime?: number;
}
