import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNumber, Min, IsOptional } from 'class-validator';

export class UpdateStadiumTimeDto {
  @ApiPropertyOptional({ description: 'The ID of the stadium' })
  @IsOptional()
  @IsInt()
  stadiumId?: number; // Optional: ID of the stadium

  @ApiPropertyOptional({ description: 'The start time of the stadium slot' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  startTime?: number; // Optional: Start time of the stadium slot

  @ApiPropertyOptional({ description: 'The end time of the stadium slot' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  endTime?: number; // Optional: End time of the stadium slot

  @ApiPropertyOptional({ description: 'The price for the stadium slot' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number; // Optional: Price for the stadium slot
}
