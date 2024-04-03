import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsNotEmpty, Min } from 'class-validator';

export class CreateUserWalletDto {
  @ApiProperty({ description: 'The ID of the user' })
  @IsInt()
  @IsNotEmpty()
  userId: number; // ID of the user

  @ApiProperty({ description: 'The amount to add to the wallet' })
  @IsNumber()
  @IsNotEmpty()
  @Min(0, { message: 'Amount must be a positive number' })
  amount: number; // Amount to add to the wallet
}
