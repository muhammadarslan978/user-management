import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../service/user/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { RoleService } from '../service/role/role.service';
import { IUser } from '../schems/user';
// import { LoginUserDto } from '../dto/login.dto';

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
}
