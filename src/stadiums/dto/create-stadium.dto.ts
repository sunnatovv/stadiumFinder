import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Min, Max, IsDate } from 'class-validator';

export class CreateStadiumDto {
  // Category ID of the stadium
  @ApiProperty({
    description: 'Category ID of the stadium',
    required: true,
  })
  @IsInt()
  @IsNotEmpty()
  categoryId: number;

  // Owner ID of the stadium
  @ApiProperty({
    description: 'Owner ID of the stadium',
    required: true,
  })
  @IsInt()
  @IsNotEmpty()
  ownerId: number;

  // Contact information for the stadium
  @ApiProperty({
    description: 'Contact information for the stadium',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  contactWith: string;

  // Name of the stadium
  @ApiProperty({
    description: 'Name of the stadium',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  // Volume of the stadium
  @ApiProperty({
    description: 'Volume of the stadium',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  volume: string;

  // Address of the stadium
  @ApiProperty({
    description: 'Address of the stadium',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  // Region ID of the stadium
  @ApiProperty({
    description: 'Region ID of the stadium',
    required: true,
  })
  @IsInt()
  @IsNotEmpty()
  regionId: number;

  // District ID of the stadium
  @ApiProperty({
    description: 'District ID of the stadium',
    required: true,
  })
  @IsInt()
  @IsNotEmpty()
  districtId: number;

  // Location of the stadium
  @ApiProperty({
    description: 'Location of the stadium',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  location: string;

  // Date when the stadium was built
  @ApiProperty({
    description: 'Date when the stadium was built',
    required: true,
  })
  @IsDate()
  buildAt: Date;

  // Starting time of stadium operations
  @ApiProperty({
    description: 'Starting time of stadium operations',
    required: true,
  })
  @IsInt()
  @IsNotEmpty()
  @Min(0)
  @Max(23)
  startTime: number;

  // Ending time of stadium operations
  @ApiProperty({
    description: 'Ending time of stadium operations',
    required: true,
  })
  @IsInt()
  @IsNotEmpty()
  @Min(0)
  @Max(23)
  endTime: number;
}
