import {
  IsOptional,
  IsString,
  IsEmail,
  IsArray,
  IsEnum,
  IsNumber,
  IsObject,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  current_password?: string;

  @IsOptional()
  @IsString()
  first_name?: string;

  @IsOptional()
  @IsString()
  last_name?: string;

  @IsOptional()
  @IsNumber()
  age?: number;

  @IsOptional()
  @IsEnum(['Male', 'Female', 'Other'])
  gender?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  fitness_goals?: string[];

  @IsOptional()
  @IsObject()
  preferences?: Record<string, any>;
}
