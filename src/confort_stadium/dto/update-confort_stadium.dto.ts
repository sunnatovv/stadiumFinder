import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsNotEmpty } from 'class-validator';

// Data transfer object (DTO) for updating a ComfortStadium entry
export class UpdateConfortStadiumDto {
  @ApiProperty({
    description: 'ID of the stadium associated with the comfort',
    required: false,
  })
  @IsNumber({}, { message: 'Stadium ID must be a number' })
  @IsOptional()
  stadiumId?: number; // Optional: ID of the stadium associated with the comfort

  @ApiProperty({
    description: 'ID of the comfort associated with the stadium',
    required: false,
  })
  @IsNumber({}, { message: 'Comfort ID must be a number' })
  @IsOptional()
  comfortId?: number; // Optional: ID of the comfort associated with the stadium
}
