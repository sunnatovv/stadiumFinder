import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsInt, IsNumber, Min } from 'class-validator';

export class UpdateUserWalletDto {
  @ApiPropertyOptional({ description: 'The ID of the user' })
  @IsOptional()
  @IsInt()
  userId?: number; // Optional: ID of the user

  @ApiPropertyOptional({ description: 'The amount to update in the wallet' })
  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'Amount must be a positive number' })
  amount?: number; // Optional: Amount to update in the wallet
}
