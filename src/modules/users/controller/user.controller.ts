import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { IUser } from '../../schema/user.schema';
import { LoginUserDto } from '../dto/login.dto';
import { UserService } from '../service/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @UsePipes(new ValidationPipe())
  async register(@Body() body: CreateUserDto): Promise<IUser> {
    console.log(body);
    return this.userService.createUser(body);
  }

  @Post('signin')
  @UsePipes(new ValidationPipe())
  async signin(@Body() body: LoginUserDto): Promise<IUser> {
    return await this.userService.signin(body);
  }
}
