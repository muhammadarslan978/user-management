import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { IUser } from '../../schema/user.schema';
import { LoginUserDto } from '../dto/login.dto';
import { UserService } from '../service/user.service';
import { ISigninResponse } from '../interface/user.interface';
import { AuthService } from 'src/modules/auth/services/auth.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { UpdateUserDto } from '../dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  @UsePipes(new ValidationPipe())
  async register(@Body() body: CreateUserDto): Promise<IUser> {
    // Need to send welcome email to user
    return this.userService.createUser(body);
  }

  @Post('signin')
  @UsePipes(new ValidationPipe())
  async signin(@Body() body: LoginUserDto): Promise<ISigninResponse> {
    const user = await this.userService.signin(body);
    const token = await this.authService.generateToken(user);
    return { user, token };
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async profile(@Req() req: any): Promise<IUser> {
    const { _id } = req.user;
    return this.userService.getUserById(_id);
  }

  @Put('/:id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  async update(@Body() body: UpdateUserDto, @Req() req: any): Promise<IUser> {
    const { id } = req.params;

    if (req.user._id !== id && !req.user.roles.includes('Admin')) {
      throw new ForbiddenException(
        'You are not authorized to update this user.',
      );
    }

    return await this.userService.updateUser(id, body);
  }
}
