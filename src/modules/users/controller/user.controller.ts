import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { IUser } from '../../schema/user.schema';
import { UserService } from '../service/user.service';
import { ISigninResponse, SuccessMessage } from '../interface/user.interface';
import { AuthService } from 'src/modules/auth/services/auth.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

import { PasswordService } from '../../auth/services/password.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/login.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { ChangePasswordDto } from '../dto/update-password.dto';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly passwordService: PasswordService,
  ) {}

  @Post('register')
  async registerUser(@Body() createUserDto: CreateUserDto): Promise<IUser> {
    createUserDto.password = await this.passwordService.hash(
      createUserDto.password,
    );
    return await this.userService.createUser(createUserDto);
  }

  @Post('signin')
  async signin(@Body() loginDto: LoginUserDto): Promise<ISigninResponse> {
    const user = await this.userService.getUser({ email: loginDto.email });
    const comparePassword = await this.authService.comparePasswords(
      loginDto.password,
      user.password,
    );
    if (!comparePassword) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    const plainUser = this.userService.transformToPlainUser(user);
    const token = await this.authService.generateToken(plainUser);
    return { user: plainUser, token };
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async profile(@Req() req: any): Promise<IUser> {
    const { _id } = req.user;
    return this.userService.getUserById(_id);
  }

  @Put('/:id')
  @UseGuards(JwtAuthGuard)
  async updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: any,
  ): Promise<any> {
    const { id } = req.params;

    if (req.user._id !== id && !req.user.roles.includes('Admin')) {
      throw new ForbiddenException(
        'You are not authorized to update this user.',
      );
    }
    return await this.userService.updateUser(id, updateUserDto);
  }

  @Put('/:id/change-password')
  @UseGuards(JwtAuthGuard)
  async changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @Req() req: any,
  ): Promise<SuccessMessage> {
    const { id } = req.params;

    if (req.user._id !== id) {
      throw new ForbiddenException(
        'You are not authorized to update this user.',
      );
    }

    const user = await this.userService.getUser({ _id: id });
    const comparePassword = await this.authService.comparePasswords(
      changePasswordDto.current_password,
      user.password,
    );
    if (!comparePassword) {
      throw new HttpException(
        'Currnet password did not matched',
        HttpStatus.UNAUTHORIZED,
      );
    }

    changePasswordDto.new_password = await this.passwordService.hash(
      changePasswordDto.new_password,
    );
    return await this.userService.changePassword(
      id,
      changePasswordDto.new_password,
    );
  }

  @Post('test')
  async test(@Body() body: any): Promise<any> {
    return body;
  }
}
