// src/auth/dto/create-user.dto.ts
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsArray,
  IsNumber,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(6)
  readonly password: string;

  @IsString()
  readonly first_name: string;

  @IsString()
  readonly last_name: string;

  @IsEnum(['User', 'Trainer', 'Coach', 'Admin'])
  readonly role: 'User' | 'Trainer' | 'Coach' | 'Admin';

  @IsOptional()
  @IsNumber()
  readonly age?: number;

  @IsOptional()
  @IsEnum(['Male', 'Female', 'Other'])
  readonly gender?: 'Male' | 'Female' | 'Other';

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly fitness_goals?: string[];

  @IsOptional()
  readonly preferences?: any;
}
