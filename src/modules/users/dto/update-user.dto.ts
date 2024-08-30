import {
  IsOptional,
  IsString,
  IsEmail,
  IsArray,
  IsEnum,
  IsNumber,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class MealPlanDto {
  @IsOptional()
  @IsString()
  mealplan_id?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @Type(() => Date)
  start_date?: Date;
}

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  email?: string;

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
  @IsArray()
  @IsString({ each: true })
  selected_workouts?: string[];

  @IsOptional()
  @IsObject()
  preferences?: Record<string, any>;

  @IsOptional()
  @ValidateNested()
  @Type(() => MealPlanDto)
  selected_meal_plan?: MealPlanDto;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  dietary_restrictions?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  food_logs?: string[];
}
