import { IsString } from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  readonly current_password: string;

  @IsString()
  new_password: string;
}
