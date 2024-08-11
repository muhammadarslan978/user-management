import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from '../../schems/role';

@Injectable()
export class RoleService {
  constructor(@InjectModel(Role.name) private roleModel: Model<Role>) {}

  async findRoleByName(roleName: string): Promise<Role> {
    const role = await this.roleModel.findOne({ role_name: roleName });
    if (!role) {
      throw new NotFoundException(`Role ${roleName} not found`);
    }
    return role;
  }

  async assignDefaultRoles(): Promise<void> {
    const roles = ['User', 'Trainer', 'Coach', 'Admin'];
    for (const roleName of roles) {
      const roleExists = await this.roleModel.findOne({ role_name: roleName });
      if (!roleExists) {
        await new this.roleModel({ role_name: roleName }).save();
      }
    }
  }
}
