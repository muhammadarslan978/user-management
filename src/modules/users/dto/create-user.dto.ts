import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsArray,
  IsNumber,
  MinLength,
  ArrayNotEmpty,
  ArrayMinSize,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @IsEnum(['User', 'Trainer', 'GUEST', 'Admin'], { each: true })
  roles: ('User' | 'Trainer' | 'GUEST' | 'Admin')[];

  @IsOptional()
  @IsNumber()
  age?: number;

  @IsOptional()
  @IsEnum(['Male', 'Female', 'Other'])
  gender?: 'Male' | 'Female' | 'Other';

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  fitness_goals?: string[];

  @IsOptional()
  preferences?: any;
}
