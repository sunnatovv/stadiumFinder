import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsNumber,
  IsBoolean,
  IsInt,
  Min,
  Max,
} from 'class-validator';

export class UpdateUserCartDto {
  @ApiPropertyOptional({ description: 'The ID of the user' })
  @IsOptional()
  @IsString()
  userId?: string; // Optional: ID of the user

  @ApiPropertyOptional({ description: 'The name on the card' })
  @IsOptional()
  @IsString()
  name?: string; // Optional: Name on the card

  @ApiPropertyOptional({ description: 'The card number' })
  @IsOptional()
  @IsString()
  number?: string; // Optional: Card number

  @ApiPropertyOptional({ description: 'The expiration year of the card' })
  @IsOptional()
  @IsNumber()
  @IsInt()
  @Min(new Date().getFullYear(), {
    message: 'Year must be greater than or equal to current year',
  })
  year?: number; // Optional: Expiration year of the card

  @ApiPropertyOptional({ description: 'The expiration month of the card' })
  @IsOptional()
  @IsNumber()
  @IsInt()
  @Min(1)
  @Max(12)
  month?: number; // Optional: Expiration month of the card

  @ApiPropertyOptional({ description: 'Indicates whether the card is active' })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean; // Optional: Indicates whether the card is active

  @ApiPropertyOptional({
    description: 'Indicates whether the card is the main card for the user',
  })
  @IsOptional()
  @IsBoolean()
  isMain?: boolean; // Optional: Indicates whether the card is the main card for the user
}
