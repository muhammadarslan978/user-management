import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { IUser } from '../../schema/user.schema';
import { LoginUserDto } from '../dto/login.dto';
import { RoleService } from '../../roles/service/role.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly roleService: RoleService,
  ) {}

  @Post('register')
  async register(@Body() body: CreateUserDto): Promise<IUser> {
    await this.roleService.findRoleByName(body.role);
    return await this.userService.createUser(body);
  }

  @Post('/signin')
  async signin(@Body() body: LoginUserDto): Promise<IUser> {
    return await this.userService.signin(body);
  }
}
