import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty } from 'class-validator';

// Data transfer object (DTO) for creating a new ComfortStadium entry
export class CreateConfortStadiumDto {
  @ApiProperty({
    description: 'ID of the stadium associated with the comfort',
    required: true,
  })
  @IsNumber({}, { message: 'Stadium ID must be a number' })
  @IsNotEmpty({ message: 'Stadium ID is required' })
  stadiumId: number; // ID of the stadium associated with the comfort

  @ApiProperty({
    description: 'ID of the comfort associated with the stadium',
    required: true,
  })
  @IsNumber({}, { message: 'Comfort ID must be a number' })
  @IsNotEmpty({ message: 'Comfort ID is required' })
  comfortId: number; // ID of the comfort associated with the stadium
}
