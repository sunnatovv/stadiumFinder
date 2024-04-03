import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsBoolean,
  IsNotEmpty,
  IsInt,
  Min,
  Max,
} from 'class-validator';

export class CreateUserCartDto {
  @ApiProperty({ description: 'The ID of the user' })
  @IsString()
  @IsNotEmpty()
  userId: string; // ID of the user

  @ApiProperty({ description: 'The name on the card' })
  @IsString()
  @IsNotEmpty()
  name: string; // Name on the card

  @ApiProperty({ description: 'The card number' })
  @IsString()
  @IsNotEmpty()
  number: string; // Card number

  @ApiProperty({ description: 'The expiration year of the card' })
  @IsNumber()
  @IsInt()
  @Min(new Date().getFullYear(), {
    message: 'Year must be greater than or equal to current year',
  })
  year: number; // Expiration year of the card

  @ApiProperty({ description: 'The expiration month of the card' })
  @IsNumber()
  @IsInt()
  @Min(1)
  @Max(12)
  month: number; // Expiration month of the card

  @ApiProperty({ description: 'Indicates whether the card is active' })
  @IsBoolean()
  isActive: boolean; // Indicates whether the card is active

  @ApiProperty({
    description: 'Indicates whether the card is the main card for the user',
  })
  @IsBoolean()
  isMain: boolean; // Indicates whether the card is the main card for the user
}
