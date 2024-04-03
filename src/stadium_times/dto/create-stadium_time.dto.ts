import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, Min } from 'class-validator';

export class CreateStadiumTimeDto {
  @ApiProperty({ description: 'The ID of the stadium' })
  @IsInt()
  stadiumId: number; // ID of the stadium

  @ApiProperty({ description: 'The start time of the stadium slot' })
  @IsNumber()
  @Min(0)
  startTime: number; // Start time of the stadium slot

  @ApiProperty({ description: 'The end time of the stadium slot' })
  @IsNumber()
  @Min(0)
  endTime: number; // End time of the stadium slot

  @ApiProperty({ description: 'The price for the stadium slot' })
  @IsNumber()
  @Min(0)
  price: number; // Price for the stadium slot
}
