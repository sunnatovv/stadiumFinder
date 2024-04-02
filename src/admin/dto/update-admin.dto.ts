import { IsOptional, IsString } from 'class-validator';

export class UpdateAdminDto {
  @IsOptional()
  @IsString()
  login?: string;

  @IsOptional()
  @IsString()
  tgLink?: string;

  @IsOptional()
  @IsString()
  adminPhoto?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  confirmPassword?: string;
}
