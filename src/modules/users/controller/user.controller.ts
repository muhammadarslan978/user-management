import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../service/user/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { RoleService } from '../service/role/role.service';
import { LoginUserDto } from '../dto/login.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly roleService: RoleService,
  ) {}

  @Post('register')
  async register(@Body() body: any): Promise<any> {
    const user = await this.userService.craeteUser(body);
    return user;
  }

  @Post('login')
  async login(@Body() body: LoginUserDto): Promise<any> {}
}
